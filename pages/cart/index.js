import { CartContext } from "@/components/CartContext";
import Navbar from "@/components/Navbar";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Cart = () => {
  const { cartProducts, addToCart, setCartProducts, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const checkout = async () => {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      address,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  };
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((res) => {
        setProducts(res.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  const addproduct = (id) => {
    addToCart(id);
  };
  const removefromCart = (id) => {
    setCartProducts((prev) => {
      const pos = prev.indexOf(id);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  };

  let total = 0;
  for (const p of cartProducts) {
    const price = products.find((x) => x._id === p)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <>
        <Navbar />
        <div>
          {" "}
          <h1>Thanks for your order!</h1>
          <p>We will email you when your order will be sent.</p>
        </div>
      </>
    );
  }
  return (
    <div>
      <Navbar />
      <div className="flex gap-6 mt-8">
        <div className="flex-1 flex flex-col items-center">
          <h1 className="text-4xl font-bold">Your Cart</h1>
          <div className="border flex flex-col gap-3 rounded-lg w-3/4 mt-8 p-2">
            {products.map((p) => (
              <div className="flex gap-3">
                <div className="w-36 h-40 border rounded-lg">
                  <img src={p.images[0]} className="w-full h-full rounded-lg"/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="text-xl font-bold">{p.title}</div>
                  <div className=" text-sm font-normal"> 
                    {p.properties.Color && <p>Color:{p.properties.Color}</p>}
                  </div>
                  <div className=" text-sm font-normal">
                    {p.properties.Size && <p>Size:{p.properties.Size}</p>}
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-2xl font-bold">₹ 
                      {cartProducts.filter((id) => id === p._id).length *
                        p.price}
                    </p>
                    <div className="flex items-center border gap-4 bg-[#F0F0F0] rounded-xl px-3 p-1">
                      <AiOutlineMinus onClick={() => removefromCart(p._id)} />
                      <div>
                        {cartProducts.filter((id) => id === p._id).length}
                      </div>
                      <AiOutlinePlus onClick={() => addproduct(p._id)} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="w-full flex justify-between">
              <p className="text-xl font-normal ">Total</p>
              <p className="text-2xl font-bold">₹ {total}</p>
            </div>
          </div>
          
        </div>
        {!!cartProducts?.length && (
          <div className="flex-1 flex flex-col">
            <h1>Order Info</h1>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="postal Code"
              value={postalCode}
              onChange={(e) => setpostalCode(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <button className="border-2 rounded-lg" onClick={checkout}>
              Continue to Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
