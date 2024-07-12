"use client";
import useCart from "@/hooks/useCart";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";

const Cart = () => {
    const { cartPrdcts } = useCart();
    const { randomBytes } = require('crypto');

    return (
        <Link href="/cart">
            <div className="w-28 hidden md:flex gap-1 relative items-center cursor-pointer hover:text-orange-600 transition duration-300">
                <FiShoppingCart size={20} />
                <div>Sepetim</div>
                {cartPrdcts && cartPrdcts.length > 0 && (
                    <div className="text-white bg-orange-500 w-4 h-4 flex items-center justify-center rounded-full">
                        {cartPrdcts.length}
                    </div>
                )}
            </div>
        </Link>
    );
}

export default Cart;
