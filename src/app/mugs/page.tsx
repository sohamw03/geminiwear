import connectDb from "@/middleware/mongoose";
import Link from "next/link";
import Product from "../../../models/Product";
import GwImage from "@/lib/GwImage";

const preload = async () => {
  await connectDb();
  const products = await Product.find({ category: "mug" });
  return products;
};

export default async function Mugs() {
  const mugs = await preload();

  return (
    <main>
      <section className="text-gray-400 body-font dark bg-background">
        <div className="container px-5 pb-24 pt-6 mx-auto">
          <h1 className="text-2xl text-white mb-8">Mugs</h1>
          <div className="flex flex-wrap -m-4">
            {mugs.length === 0 ? <div className="p-4 w-full text-center">Sorry for the inconvenience, but we are currently out of stock. Please check back later.</div> : null}
            {mugs.map((mug, index) => (
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full hover:bg-slate-900 transition-all rounded-lg" key={mug._id}>
                <Link href={`/product/${mug.slug}`} className="block relative h-48 rounded overflow-hidden">
                  <GwImage alt="ecommerce" className="object-contain object-center w-full h-full block" src={mug.img} />
                </Link>
                <div className="mt-4">
                  <h3 className="text-xs tracking-widest title-font mb-1">{mug.category}</h3>
                  <h2 className="text-white title-font text-lg font-medium">{mug.title}</h2>
                  <p className="mt-1">₹{mug.price}</p>
                  <p className="mt-1">
                    {mug.size.map((size: any) => {
                      return <span className="border px-1 rounded mr-1">{size}</span>;
                    })}
                  </p>
                  <p className="mt-1"></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
