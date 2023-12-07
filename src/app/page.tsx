import Image from "next/image";

export default function Home() {
  return (
    <>
      <Image src="/images/hero.jpeg" width={1920} height={1080} alt={"hero"} className="w-full object-cover h-[40rem] blur-sm" style={{ objectPosition: "center 75%" }} />
    </>
  );
}
