import { useState, useEffect } from "react";
import axios from "axios";




export interface Blog {
    authorId: string;
    content: string;
    title: string;
    id: string;
    author: {
        name: string;
    }
    publishedDate?: string;
    
}
 

export const useBlog = ( {id}: {id: string})=>{

    const [blog, setBlog] = useState<Blog>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1")}`
            }
        })
        .then((response) => {
            console.log("yeh hai hook",response.data);
            setBlog( response.data );
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching blogs:", error);
            alert("Error fetching blogs. Please check the console for more details.");
            setLoading(false);
        });
    }, [id]);

    return {
        loading,
        blog
    };

}


export const useBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1")}`
            }
        })
        .then((response) => {
            
            setBlogs( response.data );
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching blogs:", error);
            alert("Error fetching blogs. Please check the console for more details.");
            setLoading(false);
        });
    }, []);

    return {
        loading,
        blogs
    };

   
};

export function useUserDetails(token: any): any {
	var base64Url = token.split(".")[1];
	var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	var jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split("")
			.map(function (c) {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);
  
	return JSON.parse(jsonPayload);
}

export const useMyblogs = () =>{
    const [blogs, setBlogs] = useState();
    const [ loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    const data = useUserDetails(token);


    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/myaccount/${data.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1")}`,
                },
            })
            .then((response) => {
                setBlogs(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching user's blogs:", error);
                alert("Error fetching blogs. Please check the console for more details.");
                setLoading(false);
            });
    }, []);

    return {
        loading,
        blogs,
    };
};

