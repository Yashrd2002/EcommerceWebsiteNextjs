import CategoryShop from "@/components/Home/CategoryShop";
import Hero from "@/components/Home/Hero";
import New from "@/components/Home/New";
import Style from "@/components/Home/Style";
import Navbar from "@/components/Navbar";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";

export default function Home({ featuredproduct, newProducts,mainCategories }) {
  // console.log(featuredproduct);
  // console.log({ newProducts });
  // console.log(mainCategories);
  return (
    <div>
      <Navbar />
      <Hero />
      <New newProducts={newProducts} />
      <CategoryShop mainCategories={mainCategories}/>
      <Style />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredId = "64e38c723468f3017a3d883f";
  await mongooseConnect();
  const featuredproduct = await Product.findById(featuredId);

  const newProducts = await Product.find({}, null, {
    sort: { "_id:": -1 },
    limit: 5,
  });
  const mainCategories = await Category.find({ $or: [{ parentcategory: { $exists: false } }, { parentcategory: null }] });
  return {
    props: {
      featuredproduct: JSON.parse(JSON.stringify(featuredproduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
    },
  };
}
