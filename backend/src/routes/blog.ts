import { createBlogInput, updateBlogInput } from "@21uec027/mannkibaat-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();
 


blogRouter.use('/*', async (c, next) => {
    const jwt = c.req.header('Authorization');

    if (!jwt) {
        return c.json({ error: "Unauthorized" }, 401); // Return immediately
    }

    const token = jwt.split(" ")[1];
    try {
        const payload = await verify(token, c.env.JWT_SECRET);
        if (!payload) {
            return c.json({ error: "Unauthorized" }, 401);
        }
        c.set('userId', payload.id as string);
		console.log("Extracted userId in middleware:", c.get('userId'));
        await next(); // Continue to the next handler
    } catch (e : any) {
        console.error("JWT verification error:", e.message);
        return c.json({ error: "Unauthorized" }, 401);
    }
});






blogRouter.post('/add', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    try{
        const options: Intl.DateTimeFormatOptions = {
			timeZone: 'Asia/Kolkata',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
			month: 'short', // "short" is valid for month
			day: '2-digit', // "2-digit" is valid for day
			year: 'numeric', // "numeric" is valid for year
		  };
		  
		  const now = new Date();
		  const indiaTime = now.toLocaleString('en-IN', options);
    
    // Split the date and time
    const [time, date] = indiaTime.split(', ');

    // Combine everything into the final format
    const finalOutput = `${time}, ${date.toUpperCase()}`;

        const body = await c.req.json();
		console.log(body);
        const { success } = createBlogInput.safeParse(body);
        if(! success){
            c.status(411);
            return c.json({
                message : "inputs syntax are incorrect"
            })
        }
		console.log(body.title,body.content,userId,finalOutput);
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId,
				publishedDate: finalOutput
            }
        });
		
        return c.json({
            id: post.id
        });

		
    }
	catch(e : any){
		console.error("Error in /add route:", e.message, e.stack);
    }
})

blogRouter.put('/up', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();

    const { success } = updateBlogInput.safeParse(body);

    if(! success){
        c.status(411);
        return c.json({
            message : "input syntax is incorrect"
        })
    }

	prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
});


blogRouter.get('/bulk', async (c) => {
   try{
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	const excludedId = c.get('userId');
	
	const post = await prisma.post.findMany({
		where: {
            authorId: excludedId ? {
               not: excludedId, 
            } : undefined,
         },
		select:{
			content: true,
			title: true,
			id: true, 
			authorId: true,
			publishedDate: true,
			author: {
			   select:{
			   name: true
			
			}
		}
	}});
	

	return c.json(post);
   }
	catch(e){
		console.log(e)
	}
   
	
})

blogRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	 // 
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findUnique({
		where: {
			id
		},
		select:{
            id:true,
            title:true,
            content:true,
			authorId: true,
			publishedDate: true,
            author:{
                select:{
                    name:true
                }
            }
        }
	});

	return c.json(post);
})


blogRouter.delete("/:id", async (c) => {
	const id = c.req.param("id");
              
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		
		const res = await prisma.post.delete({
			where: {
				id: id,
				authorId: c.get("userId")
			},
		});
		console.log(c.get("userId"));
		console.log(res);
		
		return c.json({
			message: "Post deleted successfully",
			
		});
	} catch (error) {
		console.log("Error: ", error);
		c.status(403);
		return c.json({
			message: "error",
		});
	}
});

blogRouter.get("/myaccount/:authorId", async(c)=>{

	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
       
	try{ const authorId = c.req.param('authorId');

		// Fetch all posts for the specified authorId
		const posts = await prisma.post.findMany({
		   where: {
			  authorId: authorId, // Filter posts by authorId
		   },
		   select: {
			  content: true,
			  title: true,
			  id: true,
			  authorId: true,
			  publishedDate: true,
			  author: {
				 select: {
					name: true,
				 },
			  },
		   },
		});
  
		// Return the posts as a JSON response

		
		return c.json(posts);
	 } catch (e) {
		console.error(e);
		return c.json({ error: 'Something went wrong' }, 500);
	 }
  });
