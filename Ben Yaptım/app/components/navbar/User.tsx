"use client";

import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiUser } from "react-icons/fi";

interface UserProps {
    currentUser: User | null | undefined;
}

const UserComponent: React.FC<UserProps> = ({ currentUser }) => {
    const router = useRouter();

    const logoutFunc = () => {
        signOut();
        router.push('/');
    };

    return (
        <div className="relative group flex justify-center w-28 group-hover:block">
            <div className="select-none flex items-center cursor-pointer hover:text-orange-600 transition duration-300">
                <FiUser size={20} />
                {currentUser ? (
                    <span className="ml-1 select-none">Hesabım</span>
                ) : (
                    <span className="ml-1 select-none">Giriş Yap</span>
                )}
            </div>
            <div className=" z-10 hidden h-[150px] group-hover:block transition duration-300 absolute top-5 -right-3 py-3 ">
                <div className="w-32 border group-hover:block bg-white shadow-lg p-3 rounded-md">
                    {currentUser ? (
                        currentUser.role === "ADMIN" ? (
                            <div>
                                <div className="text-orange-600 mb-1 select-none">{currentUser.name}</div>
                                <div className="my-1 cursor-pointer select-none hover:text-orange-600 transition duration-300" onClick={() => router.push('/admin')} >ADMIN Paneli</div>
                                <div className="my-1 hover:text-orange-600 cursor-pointer select-none transition duration-300" onClick={() => router.push('/favorites')} >Favorilerim</div>
                                <div onClick={logoutFunc} className="mt-1 cursor-pointer hover:text-orange-600 transition duration-300">Çıkış yap</div>
                            </div>
                        ) : currentUser.role === "USER" ? (
                            <div>
                                <div className="text-orange-600 mb-1">{currentUser.name}</div>
                                <div className="my-1">Favorilerim</div>
                                <div onClick={logoutFunc} className="mt-1 cursor-pointer hover:text-orange-600 transition duration-300">Çıkış yap</div>
                            </div>
                        ) : null
                    ) : (
                        <div>
                            <Link href="/login">
                                <div className="mb-1 cursor-pointer hover:text-orange-600 transition duration-300">Giriş Yap</div>
                            </Link>
                            <Link href="/register">
                                <div className="mt-1 cursor-pointer hover:text-orange-600 transition duration-300">Kayıt Ol</div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserComponent;
