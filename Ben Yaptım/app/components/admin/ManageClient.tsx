"use client"
import { Product, User } from "@prisma/client"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";
import { useCallback } from "react";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

interface ManageClientProps {
    products: Product[],
    currentUser: User
}

const ManageClient: React.FC<ManageClientProps> = ({ products, currentUser }) => {
    const storage = getStorage(firebaseApp)
    const router = useRouter()

    const viewableProducts: Product[] = [];

    if (products) {
        products.forEach((product) => {
            if (product.userId === currentUser.id) {
                viewableProducts.push(product);
            }
        });
    }

    let rows: any = []

    if (viewableProducts.length > 0) {
        rows = viewableProducts.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category,
                inStock: product.inStock,
                image: product.image
            };
        });
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 200 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "price", headerName: "Price", width: 100 },
        { field: "category", headerName: "Category", width: 100 },
        {
            field: "inStock",
            headerName: "Stok durumu",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="text-lg flex justify-center items-center h-full my-auto">
                        {params.row.inStock ? <FiThumbsUp className="text-green-600" /> : <FiThumbsDown className="text-red-600" />}
                    </div>
                )
            }
        },
        {
            field: "action",
            headerName: "",
            width: 100,
            renderCell: (params) => {
                return (
                    <div>
                        <button onClick={() => handleDelete(params.row.id, params.row.image)} className="flex my-3 ml-2 text-2xl text-red-700">
                            <TiDeleteOutline />
                        </button>
                    </div>
                )
            }
        },
    ]
    const handleDelete = useCallback(async (id: string, image: any) => {
        toast.success('Silme işlemi başlıyor...')
        const handleDeleteImg = async () => {
            try {
                const imageRef = ref(storage, image)
                await deleteObject(imageRef)
            } catch (error) {
                return console.log("bir hata mevcut", error)
            }
        }
        await handleDeleteImg();
        axios.delete(`/api/product/${id}`)
            .then(() => {
                toast.success('Silme işlemi tamamlandı')
                router.refresh();
            })
            .catch((error: any) => {
                console.log(error)
            })
    }, [])
    return (
        <div>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    )
}

export default ManageClient
