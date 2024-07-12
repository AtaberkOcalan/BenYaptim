import React from 'react';
import { IconType } from 'react-icons';

interface ButtonProps {
    text: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    small?: boolean;
    outline?: boolean;
    icon?: IconType;
    disabled?: boolean;
    iconSize?: number; // Yeni prop
}

const Button: React.FC<ButtonProps> = ({ text, onClick, small, outline, disabled, icon: Icon, iconSize = 24 }) => {
    return (
        <button
            disabled={disabled}
            className={`my-2 flex items-center justify-center gap-2 rounded-lg p-3 ${small ? "w-[250px]" : "w-full"} ${outline ? "border text-black" : "bg-orange-500 text-white"}`}
            onClick={onClick}
        >
            {Icon && <Icon style={{ width: iconSize, height: iconSize }} />}
            {text}
        </button>
    );
}

export default Button;
