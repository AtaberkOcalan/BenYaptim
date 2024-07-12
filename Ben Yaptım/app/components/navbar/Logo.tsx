"use client"
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="px-2 py-1 rounded-md text-lg md:text-2xl cursor-pointer">
        BenYaptım<span className="text-sm">.com</span>
      </div>
    </Link>
  );
}

export default Logo;
