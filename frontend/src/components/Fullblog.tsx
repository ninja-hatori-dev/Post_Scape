import { Appbar } from "./Appbar"
import { Avatar } from "./Blogcard"
import { Blog } from "../hooks"

   
export const Fullblog = ({ blog }:{ blog : Blog}) => {
   const name  = blog.author.name.charAt(0).toUpperCase() + blog.author.name.slice(1).toLowerCase();
  
   
    return (
      <div>
          <div>
              <Appbar/>
          </div>
      
          <div className="flex justify-center pt-10">
              <div className=" w-2/3  px-16">
                  <div className="w-full ">
                      <div className=" flex justify-center items-center font-bold text-6xl">
                          {blog.title}
                      </div>
                      <div className="text-slate-400 pt-5">
                          Posted on {blog.publishedDate || "Nov 07, 2024"}
                      </div>
                      <div className=" flex justify-center items-center text-lg pt-10">
                          {blog.content}
                      </div>
                  </div>
              </div>
             
              <div className="w-1/3 border-l border-slate-400 ">
                  <div className="text-lg font-semibold pl-10">
                      Author
                  </div>
                  
                  <div className="flex items-center gap-2 pt-10 pl-10">
  <Avatar name={blog.author.name} size={"small"} />
  <div className="font-bold">{name}</div>
</div>
                       
                      
              </div>
          </div>
      </div>
    )
  }