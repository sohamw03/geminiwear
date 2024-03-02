import GwImage from "@/lib/GwImage";
import connectDb from "@/middleware/mongoose";
import Link from "next/link";
import Product from "../../../models/Product";

const preload = async () => {
  await connectDb();
  const products = await Product.find({ category: "tshirt" });
  return products;
};

export default async function TShirts() {
  const tshirts = await preload();

  return (
    <main>
      <section className="text-gray-400 body-font dark bg-background">
        <div className="container px-5 pb-24 pt-6 mx-auto">
          <h1 className="text-2xl text-white mb-8">Tshirts</h1>
          <div className="flex flex-wrap -m-4">
            {tshirts.map((tshirt, index) => (
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full hover:bg-slate-900 transition-all rounded-lg" key={tshirt._id}>
                <Link href={`/product/${tshirt.slug}`} className="block relative h-48 rounded overflow-hidden">
                  <GwImage alt="ecommerce" className="object-contain object-center w-full h-full block" src={tshirt.img} />
                </Link>
                <div className="mt-4">
                  <h3 className="text-xs tracking-widest title-font mb-1">{tshirt.category}</h3>
                  <h2 className="text-white title-font text-lg font-medium">{tshirt.title}</h2>
                  <p className="mt-1">₹{tshirt.price}</p>
                  <p className="mt-1">
                    {tshirt.size.map((size: string, index: number) => {
                      return (
                        <span key={index} className="border px-1 rounded mr-1">
                          {size}
                        </span>
                      );
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
