import Link from "next/link";
import React from "react";

const CategoryShop = ({ mainCategories }) => {
  return (
    <div className="flex flex-col gap-4 mt-10 items-center">
      <div className="text-3xl font-semibold">Shop With Categories</div>
      <div className="flex justify-evenly flex-wrap w-full">
        {mainCategories.map((c) => (
          <Link href={`/category/${c._id}`} className="flex flex-col rounded-lg items-center w-48 border-2 px-2 py-3">
            <div>{c.name}</div>
          </Link>
        ))}
      </div>
      {/* <Link
        href={"/"}
        className=" rounded-xl border flex w-40 py-1 justify-center mt-5 border-[#998f8f]"
      >
        View All
      </Link> */}
    </div>
  );
};

export default CategoryShop;
