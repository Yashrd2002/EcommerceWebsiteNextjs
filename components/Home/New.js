import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import { Rating } from "@mui/material";
import Link from "next/link";
const New = ({ newProducts }) => {
  const { addToCart } = useContext(CartContext);
  console.log(newProducts);
  return (
    <div className="flex flex-col mt-8 items-center">
      <div className="text-5xl font-bold ">NEW ARRIVALS</div>
      <div className="flex w-10/12 flex-wrap mt-14">
        {newProducts.length > 0 &&
          newProducts.map((p) => (
            <Link href={`/products/${p._id}`} className="flex cursor-pointer flex-col m-3 w-56 h-88 border shadow-lg p-2">
              <div className="bg-[#F0EEED] flex justify-center items-center w-full h-64 rounded-lg">
                <img src={p.images[0]} className="w-full h-full" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-xl font-bold">{p.title}</div>
                <Rating name="read-only" value={3.6} readOnly precision={0.1} />
                <p className="text-2xl font-bold">₹ {p.price}</p>
                {/* 
                <button
                  onClick={() => addToCart(p._id)}
                  className="text-sm border-2 rounded-lg p-1 shadow-sm shadow-[#d7c9c9]"
                >
                  Add to cart
                </button> */}
              </div>
            </Link>
          ))}
      </div>

      <Link
        href={"/products"}
        className=" rounded-xl border flex w-40 py-1 justify-center mt-5 border-[#998f8f]"
      >
        View All
      </Link>
    </div>
  );
};

export default New;
