"use client"

import Image from "next/image"
import Counter from "../general/Counter"
import { useEffect, useState } from "react"
import { Rating } from "@mui/material"
import Button from "../general/Button"
import Comment from "./Comment"
import Heading from "../general/Heading"
import UseCart from "@/hooks/useCart"
import MainContainer from "../containers/MainContainer"


export type CardProductProps = {
    id: string
    name: string
    description: string
    price: number
    quantity: number
    image: string
    inStock: boolean
}

const DetailClient = ({product}: {product: any}) => {

    const {productCartQty, addToBasket, cartPrdcts} = UseCart();
    const [displayButton, setDisplayButton] = useState(false)

    const [cardProduct, setCardProduct] = useState<CardProductProps>({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: 1,
        image: product.image,
        inStock: product.inStock,
    })


    useEffect(() => {
        setDisplayButton(false)
        let controlDisplay: any = cartPrdcts?.findIndex(cart => cart.id == product.id)
        if(controlDisplay > -1){
            setDisplayButton(true)
        }
    },[cartPrdcts])

    const increaseFunc = () => {
       if(cardProduct.quantity == 10) return
       setCardProduct(prev => ({...prev, quantity: prev.quantity + 1 }))
    }
    const decreaseFunc = () => {
        if(cardProduct.quantity == 1) return
        setCardProduct(prev => ({...prev, quantity: prev.quantity - 1 }))
    }

    let productRating = product?.reviews?.reduce((acc: number, item: any) => acc + item.rating, 0) / product?.reviews?.length

    return (
        <MainContainer>
            <div className="flex gap-10 justify-center">
                <div className="relative h-[400px] w-[400px]">
                    <Image src={product?.image} fill alt="" />
                </div>
                <div className="w-1/2 space-y-3">
                    <div className="text-2xl">{product?.name}</div>
                    <Rating name="read-only" value={productRating} readOnly />
                    <div className="text-slate-500">{product.description}</div>
                    <div className="flex items-center gap-2">
                        <div>STOK DURUMU</div>
                        {
                            product.inStock ? <div className="text-green-500"> Ürün Stokta Mevcut</div> : <div className="text-red-500">Ürün Stokta Kalmadı</div>
                        }
                    </div>
                    <div className="text-2xl text-orange-600 font-bold">{product.price} ₺</div>

                    {
                        displayButton ? <>
                            <Button text="Ürün Sepete Zaten Ekli" small outline onClick={() => {}} />
                        </> : <>
                            <Counter increaseFunc={increaseFunc} decreaseFunc={decreaseFunc} cardProduct={cardProduct} />
                            <Button text="Sepete Ekle" small onClick={() => addToBasket(cardProduct)} />

                        </>
                    }
                </div>
            </div>
            <Heading text="Yorumlar" />
            <div>
                {
                    product?.reviews?.map((prd: any) => (
                        <Comment key={prd.id} prd={prd} />
                    ))
                }
            </div>
        </MainContainer>
    );
};

export default DetailClient;
