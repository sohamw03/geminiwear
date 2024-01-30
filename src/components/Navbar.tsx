import Link from "next/link";
import Account from "./AccountDropdown";
import Cart from "./Cart";

export default function Navbar() {
  return (
    <>
      <header className="text-gray-400 bg-background dark body-font border-b sticky top-0 z-50">
        <div className=" mx-auto flex flex-wrap p-5 flex-col md:flex-row items-start">
          <div className="flex w-full justify-between">
            <Link href={"/"} className="flex title-font font-medium items-center text-white mb-4 md:mb-0 flex-1">
              <span className="text-2xl font-bold">GeminiWear</span>
            </Link>
            <Cart />
            <Account />
          </div>
          <nav className="md:mr-auto md:py-1 flex flex-wrap items-center text-base justify-center">
            <Link href={"/tshirts"} className="mr-5 hover:text-white">
              Tshirts
            </Link>
            <Link href={"/hoodies"} className="mr-5 hover:text-white">
              Hoodies
            </Link>
            <Link href={"/stickers"} className="mr-5 hover:text-white">
              Stickers
            </Link>
            <Link href={"/mugs"} className="mr-5 hover:text-white">
              Mugs
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
