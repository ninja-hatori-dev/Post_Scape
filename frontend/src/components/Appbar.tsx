import { Link } from "react-router-dom"
import { Avatar } from "./Blogcard"
import {  useUserDetails } from "../hooks"
import { useState } from "react";

export const Appbar = () =>{
    const  userDetails = useUserDetails(localStorage.getItem("token"));
    

    return <div className="border-b flex justify-between px-10 py-4 ">
        <Link to="/blogs" className="flex flex-col justify-center cursor-pointer">
       
           PostScape
         
        </Link>
       
           <div className="flex font-10">

           <Link to="/publish">
           <button type="button" className=" mr-4 ">Write</button>
           </Link>
           
            <Link to ="/myaccount">
            <div>
                User
            </div>
         

            </Link>


</div>
            
    
    
</div>
}