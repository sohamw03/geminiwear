import connectDb from "@/middleware/mongoose";
import Link from "next/link";
import Product from "../../../models/Product";

export const preload = async () => {
  await connectDb();
  const products = await Product.find({ category: "hoodie" });
  return products;
};

export default async function Hoodies() {
  const hoodies = await preload();

  return (
    <main>
      <section className="text-gray-400 body-font dark bg-background">
        <div className="container px-5 pb-24 pt-6 mx-auto">
          <h1 className="text-2xl text-white mb-8">Hoodies</h1>
          <div className="flex flex-wrap -m-4">
            {hoodies.map((hoodie) => (
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full hover:bg-slate-900 transition-all rounded-lg" key={hoodie._id}>
                <Link href={`/product/${hoodie.slug}`} className="block relative h-48 rounded overflow-hidden">
                  <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={hoodie.img} />
                </Link>
                <div className="mt-4">
                  <h3 className="text-xs tracking-widest title-font mb-1">{hoodie.category}</h3>
                  <h2 className="text-white title-font text-lg font-medium">{hoodie.title}</h2>
                  <p className="mt-1">₹{hoodie.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
