import connectDb from "@/middleware/mongoose";
import Product from "../../../models/Product";

export const preload = async () => {
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
          <h1 className="text-2xl text-white mb-4">Tshirts</h1>
          <div className="flex flex-wrap -m-4">
            {tshirts.map((tshirt) => (
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={tshirt._id}>
                <a href="/" className="block relative h-48 rounded overflow-hidden">
                  <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={tshirt.img} />
                </a>
                <div className="mt-4">
                  <h3 className="text-xs tracking-widest title-font mb-1">{tshirt.category}</h3>
                  <h2 className="text-white title-font text-lg font-medium">{tshirt.title}</h2>
                  <p className="mt-1">₹{tshirt.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
