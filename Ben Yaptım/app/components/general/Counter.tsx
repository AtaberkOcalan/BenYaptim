import { CardProductProps } from "../detail/DetailClient"

interface CounterProps {
    cardProduct : CardProductProps,
    increaseFunc : () => void,
    decreaseFunc : () => void,
}

const Counter:React.FC<CounterProps> = ({cardProduct, increaseFunc, decreaseFunc}) => {
    const buttonStyle = "w-8 h-8 border flex item-center justify-center text-lg rounded-md"
    return (
    <div className="flex items-center gap-2 select-none">
        <div onClick={decreaseFunc} className={buttonStyle}>-</div>
        <div className="text-lg">{cardProduct.quantity}</div>
        <div onClick={increaseFunc} className={buttonStyle}>+</div>
    </div>
  )
}

export default Counter