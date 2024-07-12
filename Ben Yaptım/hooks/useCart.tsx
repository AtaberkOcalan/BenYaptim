"use client"
import { CardProductProps } from "@/app/components/detail/DetailClient";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CartContextProps {
 productCartQty: number
 cartPrdcts: CardProductProps[] | null
 addToBasket: (product: CardProductProps) => void 
 addToBasketIncrease: (product: CardProductProps) => void 
 addToBasketDecrease: (product: CardProductProps) => void 
 removeFromCart: (product: CardProductProps) => void
 removeCart: () => void
}
const CartContext = createContext<CartContextProps | null>(null)


interface Props{
    [propName: string]: any
}
export const CartContextProvider = (props: Props) => {
    const [productCartQty, setProductCartQty] = useState(0)
    const [cartPrdcts, setCartPrdcts] = useState<CardProductProps[] | null>(null)

    useEffect(() => {
        let getItem: any = localStorage.getItem('cart')
        let getItemParse: CardProductProps[] | null = JSON.parse(getItem)
        setCartPrdcts(getItemParse)
    }, [])

    useEffect(() => {
        if (cartPrdcts !== null) {
            localStorage.setItem('cart', JSON.stringify(cartPrdcts))
        }
    }, [cartPrdcts])

    const addToBasketIncrease = useCallback((product: CardProductProps) => {
        if (product.quantity === 10) {
            return toast.error('Daha fazla ekleyemezsin...');
        }
        setCartPrdcts(prevCart => {
            if (prevCart) {
                const updatedCart = prevCart.map(item => {
                    if (item.id === product.id) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });
                return updatedCart;
            }
            return prevCart;
        });
    }, []);

    const addToBasketDecrease = useCallback((product: CardProductProps) => {
        setCartPrdcts(prevCart => {
            if (prevCart) {
                const existingProduct = prevCart.find(item => item.id === product.id);
                if (existingProduct && existingProduct.quantity > 1) {
                    // Eğer ürün sayısı 1'den fazla ise, azaltma işlemi yapılır
                    const updatedCart = prevCart.map(item => {
                        if (item.id === product.id) {
                            return { ...item, quantity: item.quantity - 1 };
                        }
                        return item;
                    });
                    return updatedCart;
                } else if (existingProduct && existingProduct.quantity === 1) {
                    // Eğer ürün sayısı 1 ise, sepetten kaldırma işlemi yapılır
                    toast.success('Ürün sepetten kaldırıldı!');
                    return prevCart.filter(item => item.id !== product.id);
                }
            }
            return prevCart;
        });
    }, []);
    

    const removeCart = useCallback(() => {
        setCartPrdcts(null);
        localStorage.removeItem('cart');
    }, []);

    const addToBasket = useCallback((product: CardProductProps) => {
        setCartPrdcts(prevCart => {
            if (prevCart) {
                const existingItem = prevCart.find(item => item.id === product.id);
                if (existingItem) {
                    return prevCart.map(item => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
                }
                return [...prevCart, { ...product, quantity: 1 }];
            }
            return [{ ...product, quantity: 1 }];
        });
        toast.success('Ürün sepete eklendi!');
    }, []);

    const removeFromCart = useCallback((product: CardProductProps) => {
        setCartPrdcts(prevCart => {
            if (prevCart) {
                const filteredCart = prevCart.filter(item => item.id !== product.id);
                return filteredCart;
            }
            return prevCart;
        });
        toast.success('Ürün sepetten kaldırıldı!');
    }, []);

    const value = {
        productCartQty,
        addToBasket,
        cartPrdcts,
        removeFromCart,
        removeCart,
        addToBasketIncrease,
        addToBasketDecrease
    };

    return (
        <CartContext.Provider value={value} {...props} />
    );
};


const UseCart = () => {
    const context = useContext(CartContext)
    if(context == null){
        throw new Error('Bir hata durumu mevcut')
    }
    return context
}

export default UseCart
