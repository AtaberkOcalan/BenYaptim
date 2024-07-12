"use client"
import { Rating } from "@mui/material";
import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { DateTime } from "next-auth/providers/kakao";

type Review = {
    id: string;
    userId: string;
    productId: string;
    rating: number;
    createdAt: DateTime;
};

type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    userId: string;
    category: string;
    inStock: boolean;
    image: string;
    reviews?: Review[];
};


const ProductCard = ({ product, currentUser }: { product: Product, currentUser: User | null }) => {
    const router = useRouter();

    const [isLiked, setIsLiked] = useState(false);
    const [showHeart, setShowHeart] = useState(false);

    const handleLikeClick = useCallback(async () => {
        if (!currentUser)
            return;
    
        try {
            const response = await fetch('/api/addFavorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product.id,
                    userId: currentUser.id,
                }),
            });
    
            if (response.ok) {
                setIsLiked(true);
            } else {
                console.error('Failed to add favorite');
            }
        } catch (error) {
            console.error('Failed to add favorite', error);
        }
    }, [currentUser, product.id]);

    let productRating = product?.reviews ? product.reviews.reduce((acc: number, item: any) => acc + item.rating, 0) / product.reviews.length : 0;

    return (
        <div
            onClick={() => router.push(`product/${product.id}`)}
            className="cursor-pointer w-[185px] shadow-md border p-2 m-2 rounded-md relative flex flex-col flex-1"
            onMouseEnter={() => setShowHeart(true)}
            onMouseLeave={() => setShowHeart(false)}
        >
            <div className="relative h-[185px] w-full rounded-md overflow-hidden">
                <Image
                    src={product.image}
                    alt=""
                    layout="fill"
                    className="object-cover"
                />
                {(showHeart || isLiked) && (
                    <FiHeart
                        onClick={(e) => {
                            e.stopPropagation();
                            handleLikeClick();
                        }}
                        className={`absolute top-2 right-2 cursor-pointer text-xl ${isLiked ? "text-red-500" : "text-gray-500"
                            } hover:text-red-500 transition-colors duration-200`}
                    />
                )}
            </div>
            <div className="space-y-1 py-3">
                <div className="text-gray-800 text-xs h-12 overflow-hidden">
                    {product.name}
                </div>
                <Rating name="read-only" value={productRating} readOnly className="text-base py-1" />
                <div className="font-bold text-sm flex justify-between items-center">
                    {product.price} ₺
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
