import { Button } from "@/shadcn/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/shadcn/components/ui/sheet";
import { ShoppingCart } from "lucide-react";

export default function Cart() {
  return (
    <Sheet>
      <SheetTrigger asChild className="dark">
        <Button variant={"outline"} size={"icon"} className="dark">
          <ShoppingCart size={20} color="white" />
        </Button>
      </SheetTrigger>
      <SheetContent className="dark">
        <SheetHeader>
          <SheetTitle>Are you sure absolutely sure?</SheetTitle>
          <SheetDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
