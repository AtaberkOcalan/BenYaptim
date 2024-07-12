"use client"
import UseCart from "@/hooks/useCart";
import MainContainer from "../containers/MainContainer";
import Image from "next/image";
import { FiXCircle } from "react-icons/fi";
import Counter from "../general/Counter";

const CartClient = () => {
    const { cartPrdcts, removeFromCart, removeCart, addToBasketIncrease, addToBasketDecrease } = UseCart();

    if (!cartPrdcts || cartPrdcts.length === 0) {
        return <div>Sepetinizde ürün bulunmamaktadır...</div>;
    }

    let cartPrdctsTotal = cartPrdcts.reduce((acc, item) => acc + item.quantity * item.price, 0);

    return (
        <MainContainer>
            <div className="my-10">
                <div className="flex items-center gap-3 text-center border-b py-3">
                    <div className="w-1/5">Ürün Resmi</div>
                    <div className="w-1/5">Ürün Adı</div>
                    <div className="w-1/5">Ürün Miktarı</div>
                    <div className="w-1/5">Ürün Fiyatı</div>
                    <div className="w-1/5"></div>
                </div>
                <div>
                    {cartPrdcts.map((cart) => (
                        <div className="flex items-center justify-between text-center my-5" key={cart.id}>
                            <div className="w-1/5 flex items-center justify-center">
                                <Image src={cart.image} width={40} height={40} alt="" />
                            </div>
                            <div className="w-1/5 text-sm">{cart.name}</div>
                            <div className="w-1/5 flex justify-center">
                                <Counter cardProduct={cart} increaseFunc={() => addToBasketIncrease(cart)} decreaseFunc={() => addToBasketDecrease(cart)} />
                            </div>
                            <div className="w-1/5 text-orange-600">{cart.price}</div>
                            <div className="text-slate-800 w-1/5 flex justify-centers items-center gap-1">
                                <FiXCircle onClick={() => removeFromCart(cart)} className="text-md cursor-pointer" />
                                <div onClick={() => removeFromCart(cart)} className="text-sm cursor-pointer">Sil</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-between my-5 py-3 border-t text-center">
                    <button onClick={() => removeCart()} className="w-1/5 underline text-sm">Sepeti Sil</button>
                    <div className="text-lg text-orange-600 font-bold">{cartPrdctsTotal} ₺</div>
                </div>
            </div>
        </MainContainer>
    );
};

export default CartClient;
