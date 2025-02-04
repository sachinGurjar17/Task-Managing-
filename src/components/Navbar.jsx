import { useState } from "react"
import { NavLink } from "react-router-dom"
export default function Navbar(){
    const [status,setStatus] = useState(false);
    return (
        <>
            <div className="flex flex-row justify-center gap-20 text-xl bg-gray-200 m-2 rounded-xl py-2 ">
                <NavLink 
                    to={'/'} 
                    className={({isActive})=> `hover:bg-zinc-400 px-2 rounded-md border-black border-1 ${isActive ? "bg-zinc-500 text-white " : ""}`}
                >
                    Task Manager
                </NavLink>
                <NavLink 
                    to={'/calender'}
                    className={({isActive})=> `hover:bg-zinc-400 px-2 rounded-md border-black border-1 ${isActive ? "bg-zinc-500 text-white " : ""}`} 
                >
                    Members DashBoard
                </NavLink>
            </div>
        </>
    )
}