import CategoryFilters from "@/components/CategoryFilters";
import Navbar from "@/components/Navbar";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Rating } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Categories = ({ products }) => {
  const router = useRouter();
  const { id } = router.query;

  const [cate, setCate] = useState([]);
  const [category, setcategory] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [brandValues, setBrandValues] = useState([]);
  const [colorValues, setColorValues] = useState([]);
  const [gender, setGender] = useState([]);

  let filteredProducts;
  filteredProducts = products?.filter((product) => {
    const priceMatches =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    let categoryMatches;
    if (cate.length === 0) {
      categoryMatches=category.includes(product.category);
    } else {
      categoryMatches = cate.includes(product.category);
    }

    const brand =
      brandValues.length === 0 ||
      brandValues.includes(product.properties?.Brand);
    const color =
      colorValues.length === 0 ||
      colorValues.includes(product.properties?.Color);
    const gen =
      gender.length === 0 || gender.includes(product.properties?.Gender);

    return priceMatches && categoryMatches && brand && color && gen;
  });

  return (
    <div>
      <Navbar />
      <div className="flex mt-14">
        <CategoryFilters
          id={id}
          cate={cate}
          setCate={setCate}
          setPriceRange={setPriceRange}
          priceRange={priceRange}
          setBrandValues={setBrandValues}
          brandValues={brandValues}
          colorValues={colorValues}
          setColorValues={setColorValues}
          gender={gender}
          setGender={setGender}
          category={category}
          setcategory={setcategory}
        />
        <div className="flex flex-wrap  w-10/12">
          {filteredProducts?.length > 0 &&
            filteredProducts.map((p) => (
              <Link
                href={`/products/${p._id}`}
                className="flex flex-col gap-2 w-56 border-2 h-96 rounded-xl shadow-lg m-3 p-3"
              >
                <div className="bg-[#F0EEED] flex justify-center items-center w-full h-64 rounded-lg">
                  <img src={p.images[0]} className="w-full h-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-xl font-bold">
                    {p.title.length <= 16
                      ? p.title
                      : `${p.title.substring(0, 16)}...`}
                  </div>
                  <Rating
                    name="read-only"
                    value={3.6}
                    readOnly
                    precision={0.1}
                  />
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
      </div>
    </div>
  );
};

export default Categories;

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;

  const products = await Product.find();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
