import GwImage from "@/lib/GwImage";
import Link from "next/link";

export default function Home() {
  return (
    <main className="dark bg-background">
      <section className="relative">
        <div className="flex flex-wrap w-full mb-20 px-8 flex-col items-center text-center absolute top-[40%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-10">
          <h1 className="sm:text-5xl text-4xl font-semibold title-font mb-2 text-gray-100">Welcome to GeminiWear</h1>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-300">Discover the latest trends in fashion and shop for high-quality clothing and accessories.</p>
        </div>
        <GwImage src="/images/hero.jpeg" alt={"hero"} className="w-full object-cover h-[88svh] brightness-50" superStyle={{ objectPosition: "center 75%" }} />
      </section>
      <section className="text-gray-400 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-[#1e293b] text-indigo-300 mb-4">
                  <svg fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-100 font-medium title-font mb-2">Stylish Clothing</h2>
                <p className="leading-relaxed text-base">Explore our wide range of trendy clothing options for men, women, and kids.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-[#1e293b] text-indigo-300 mb-4">
                  <svg fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-100 font-medium title-font mb-2">Accessories</h2>
                <p className="leading-relaxed text-base">Complete your look with our collection of stylish accessories, including bags, hats, and jewelry.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-[#1e293b] text-indigo-300 mb-4">
                  <svg fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-100 font-medium title-font mb-2">Footwear</h2>
                <p className="leading-relaxed text-base">Step out in style with our collection of comfortable and fashionable footwear.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-[#1e293b] text-indigo-300 mb-4">
                  <svg fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-100 font-medium title-font mb-2">New Arrivals</h2>
                <p className="leading-relaxed text-base">Stay ahead of the fashion curve with our latest collection of trendy and stylish clothing.</p>
              </div>
            </div>
          </div>
          <Link href={"/tshirts"}>
            <button className="flex mx-auto mt-16 text-white bg-[#1e293b] border-0 py-2 px-8 focus:outline-none hover:bg-[#1e293b] rounded text-lg">Shop Now</button>
          </Link>
        </div>
      </section>
    </main>
  );
}
