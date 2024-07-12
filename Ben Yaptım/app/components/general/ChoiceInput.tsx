import { IconType } from "react-icons"

interface ChoiceInputProps{
    text: string
    icon: IconType
    onClick: (value: string) => void
    selected?: boolean
}

const ChoiceInput:React.FC<ChoiceInputProps> = ({text, icon: Icon, onClick, selected}) => {
  
    return (
    <div onClick={() => onClick(text)} className={`flex items-center gap-2 h-9 rounded-lg border p-2 cursor-pointer select-none ${selected ? "border-orange-500" : "border-gray-200"}`}>
        <Icon/>
        <span className="text-slate-600 text-lg rounded-md">{text}</span>
    </div>
  )
}

export default ChoiceInput