import React from 'react'
import AdminSidebar from '../components/admin/AdminSidebar'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-[1150px] mx-auto gap-10'>
            <div className='flex gap-3'>
                <AdminSidebar />
                {children}
                <div className='w-1/4 border-l'></div>
            </div>
        </div>
    )
}

export default AdminLayout