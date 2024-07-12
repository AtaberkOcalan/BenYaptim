"use client"
import { RiBox1Fill, RiDashboardHorizontalFill, RiStickyNoteAddLine } from "react-icons/ri"
import AdminSidebarItem from "./AdminSidebarItem"
import { usePathname } from "next/navigation"
import { MdManageSearch } from "react-icons/md"

const AdminSidebar = () => {
    const pathname = usePathname();
    const adminPanel = [
        {
            name: "Özet",
            icon: RiDashboardHorizontalFill,
            url: "/admin",
        },
        {
            name: "Ürün Ekle",
            icon: RiStickyNoteAddLine,
            url: "/admin/create",
        },
        {
            name: "Ürünleri Yönet",
            icon: MdManageSearch,
            url: "/admin/manage",
        },
        {
            name: "Siparişler",
            icon: RiBox1Fill,
            url: "/admin/order",
        }
    ]
    return (
        <div className=" w-1/4 h-screen border-r py-4">
            <div className="space-y-4">
                {
                    adminPanel.map((admin, i) => (
                        <AdminSidebarItem
                            key={i}
                            selected={pathname == admin.url}
                            icon={admin.icon}
                            name={admin.name}
                            url={admin.url} />
                    ))
                }
            </div>
        </div>
    )
}

export default AdminSidebar