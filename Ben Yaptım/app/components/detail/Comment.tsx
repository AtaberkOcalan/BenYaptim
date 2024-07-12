"use client"

import { RxAvatar } from "react-icons/rx"
import Avatar from "../general/Avatar"
import { Rating } from "@mui/material"

const Comment = ({prd}: {prd : any}) => {
    console.log(prd, "prd")
  return (
    <div className="border w-2/5 p-2 rounded-lg my-3">
        {/*<Avatar image = {prd?.user?.image}/> */}
        <div className="flex items-center gap-1">
            <RxAvatar size={45}/>
            <div>
                <div>{prd?.user?.name}</div>
                <Rating name="read-only" value={prd?.user?.rating} readOnly />

            </div>
        </div>
        <div className="text-slate-500">{prd.comment}</div>
    </div>
  )
}

export default Comment