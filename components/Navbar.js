import Link from "next/link";
import React, { useContext } from "react";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineAccountCircle } from "react-icons/md";
import { CartContext } from "./CartContext";
const Navbar = () => {
  const { cartProducts } = useContext(CartContext);
  return (
    <div className="flex justify-center items-center h-20">
      <div className="flex w-10/12 justify-between">
        <div className="text-3xl font-extrabold tracking-wider">SHOP.CO</div>
        <div className="hidden sm:flex gap-5 text-lg items-center ">
          <Link href={"/"}>Home</Link>
          <Link href={"/products"}>All products</Link>
          <Link href={"categories"}>Categories</Link>
          <Link href={"/account"}>Account</Link>
        </div>
        <div>
          <div className="hidden border-b-2 border-black p-2 rounded-lg px-6 items-center lg:flex">
            <AiOutlineSearch className="text-xl" />
            <input type="text" className="px-2 outline-none bg-transparent" />
          </div>
        </div>
        <Link href={'/cart'} className="flex relative text-2xl items-center gap-4">
          <AiOutlineShoppingCart />
          <div className="absolute left-4 bottom-5 rounded-full w-4 h-4 text-xs flex items-center justify-center bg-black text-white ">
            {cartProducts.length}
          </div>
          <MdOutlineAccountCircle />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
