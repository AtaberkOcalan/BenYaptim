"use client"
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import {FaGoogle} from 'react-icons/fa'
import AuthContainer from "../containers/AuthContainer"
import Button from "../general/Button"
import Heading from "../general/Heading"
import Input from "../general/Input"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { User } from "@prisma/client"
import { useEffect } from "react"

interface LoginClientProps{
    currentUser: User | null | undefined
  }
  
  const LoginClient:React.FC<LoginClientProps> = ({currentUser}) => {
      const router = useRouter();
      const {
          register,
          handleSubmit,
          watch,
          formState: { errors },
        } = useForm<FieldValues>()
  
        const onSubmit: SubmitHandler<FieldValues> = (data) => {
          signIn('credentials', {
              ...data,
              redirect: false
          }).then((callback) => {
              if(callback?.ok){
                  router.push('/')
                  router.refresh();
                  toast.success('Login İşlemi Basarılı...')
              }
  
              if(callback?.error){
                  toast.error(callback.error)
              }
          })
        }
  
        useEffect(() => {
           if(currentUser){
            router.push('/')
            router.refresh();
           }
        }, [])
    return (
        <AuthContainer>
            <div className="w-[500px] p-3 shadow-lg border rounded-md">
                <Heading text="Giriş Yap" center />
                <Input placeholder="Email" type="email" id="email" register={register} errors={errors} required />
                <Input placeholder="Parola" type="password" id="password" register={register} errors={errors} required />
                <Button text="Giriş Yap" onClick={handleSubmit(onSubmit)} />
                <div className="text-center my-2 text-sm text-red-500">Hesabınız yok mu? <Link className="underline" href="/register">Kayıt olun</Link></div>
                <div className="text-center my-2 font-bold text-lg">VEYA</div>
                <Button text="Google ile giriş yap" icon={FaGoogle} outline onClick={() => signIn('google')} />
            </div>
        </AuthContainer>
    );
};

export default LoginClient;
