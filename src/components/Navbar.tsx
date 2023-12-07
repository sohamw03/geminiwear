import { Button } from "@/shadcn/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="text-gray-400 bg-background dark body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href={"/"} className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <span className="text-xl">GeminiWear</span>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
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
        <Button variant={"outline"} size={"icon"} className="dark">
          <ShoppingCart size={20} color="white" />
        </Button>
      </div>
    </header>
  );
}
