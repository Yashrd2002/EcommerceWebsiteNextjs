import { CartContext } from "@/components/CartContext";
import Navbar from "@/components/Navbar";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import React, { useContext, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const IndiProduct = ({ product }) => {
  const { cartProducts, addToCart,setCartProducts } = useContext(CartContext);
  const [mainImage,setMainImage] = useState(product?.images[0])
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
  const changeMainImage = (i)=>{
    setMainImage(i);
  }
  return (
    <div>
      <Navbar />
      <div className="flex mt-10">
        <div className="w-6/12 flex gap-6" >
          <div>
          <div className="flex gap-2 flex-col ml-2">
            {product.images?.map((i) => (
              <div className="w-40 h-48 border rounded-lg shadow-sm cursor-pointer" onClick={()=>changeMainImage(i)}>
                <img src={i} className="w-full h-full rounded-lg"/>
              </div>
            ))}
          </div>
          </div>
          <div className="shadow-2xl rounded-lg" style={{"height":"600px"}}>
              <img src={mainImage} className="w-full h-full rounded-lg"/>
          </div>
        </div>
        <div className="w-6/12 flex flex-col items-center">
          <div className="flex flex-col gap-5 w-11/12 ">
            <h1 className="text-4xl font-bold">{product?.title}</h1>
            <p className="text-3xl font-bold">₹ {product?.price}</p>
            <p className="text-base font-normal">{product?.description}</p>
            {product.properties.Color && (
              <div>Color : {product.properties.Color}</div>
            )}
            {product.properties.Size && (
              <div>Size : {product?.properties?.Size}</div>
            )}

            <div className="flex">
              <button
                onClick={() => addToCart(product._id)}
                className="text-lg border-2 bg-[#000] text-[#fff] rounded-lg p-1 px-4 shadow-sm shadow-[#d7c9c9]"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiProduct;

export async function getServerSideProps(context) {
  await mongooseConnect();
  console.log(context);
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
