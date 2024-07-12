"use client"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../general/Heading";
import Input from "../general/Input";
import Checkbox from "../general/Checkbox";
import ChoiceInput from "../general/ChoiceInput";
import Button from "../general/Button";
import { useState } from "react";
import firebaseApp from "@/libs/firebase";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoDiamondOutline, IoHomeOutline, IoManOutline, IoWomanOutline } from "react-icons/io5";
import { LiaChildSolid } from "react-icons/lia";
import { FaWallet } from "react-icons/fa6";
import { v4 as uuidv4 } from 'uuid';

const CreateForm = () => {
   const [img, setImg] = useState<File | null>(null);
   const router = useRouter();

   const categoryList = [
      { name: "Erkek Giyim", icon: IoManOutline },
      { name: "Kadın Giyim", icon: IoWomanOutline },
      { name: "Çocuk Giyim", icon: LiaChildSolid },
      { name: "Ev Dekorasyonu", icon: IoHomeOutline },
      { name: "Aksesuarlar", icon: IoDiamondOutline },
      { name: "Deri Ürünleri", icon: FaWallet },
   ];

   const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
      defaultValues: {
         name: "",
         description: "",
         category: "",
         price: "",
         image: "",
         inStock: false
      }
   });

   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      if (!img) {
         toast.error('Lütfen bir resim yükleyin');
         return;
      }

      console.log("data", data);

      let uploadedImg;
      const toastId = toast.loading('Ürün listeleniyor');
      const handleChange = async () => {
         try {
            const storage = getStorage(firebaseApp);
            const sanitizedProductName = data.name.replace(/\s+/g, '-').toLowerCase();
            const storageRef = ref(storage, `images/${sanitizedProductName}-${uuidv4()}.jpg`); 

            const uploadTask = uploadBytesResumable(storageRef, img);
            await new Promise<void>((resolve, reject) => {
               uploadTask.on('state_changed',
                  (snapshot) => {
                     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                     console.log('Upload is ' + progress + '% done');
                     switch (snapshot.state) {
                        case 'paused':
                           console.log('Upload is paused');
                           break;
                        case 'running':
                           console.log('Upload is running');
                           break;
                     }
                  },
                  (error) => {
                     reject(error);
                  },
                  () => {
                     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        uploadedImg = downloadURL;
                        resolve();
                     }).catch((error) => {
                        console.log(error);
                     });
                  }
               );
            });
         } catch (error) {
            console.log(error);
            toast.error('Yükleme hatası. Lütfen tekrar deneyin.', { id: toastId });
         }
      };
      await handleChange();

      let newData = { ...data, image: uploadedImg };

      axios.post('/api/product', newData)
         .then(() => {
            toast.success('Ürün başarıyla listelendi', { id: toastId });
            router.refresh();
         }).catch((error) => {
            console.log(error, "error");
            toast.error('Ürün listelenirken hata oluştu.', { id: toastId });
         });
   };

   const category = watch('category');

   const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {
         shouldDirty: true,
         shouldTouch: true,
         shouldValidate: true
      });
   };

   const onChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
         setImg(e.target.files[0]);
      }
   };

   return (
      <div>
         <Heading text="ÜRÜN OLUSTUR" center />
         <Input
            placeholder="Ad"
            type="text"
            id="name"
            register={register}
            errors={errors}
            required
         />
         <Input
            placeholder="Acıklama"
            type="text"
            id="description"
            register={register}
            errors={errors}
            required
         />
         <Input
            placeholder="Fiyat"
            type="number"
            id="price"
            register={register}
            errors={errors}
            required
         />
         <Checkbox
            id="inStock"
            label="Ürün Stokta Mevcut mu ?"
            register={register}
         />
         <div className="flex flex-wrap gap-3">
            {categoryList.map((cat, i) => (
               <ChoiceInput
                  key={i}
                  icon={cat.icon}
                  text={cat.name}
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category == cat.name}
               />
            ))}
         </div>
         <input className="my-2 mt-3" type="file" onChange={onChangeFunc} />
         <Button text="Ürün Olustur" onClick={handleSubmit(onSubmit)} />
      </div>
   );
}

export default CreateForm;
