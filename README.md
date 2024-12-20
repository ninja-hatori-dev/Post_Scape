# PostScape

PostScape, a platform for publishing articles and engaging with readers. It leverages modern technologies such as React for the frontend, Cloudflare Workers for the backend, and various other tools and libraries to create a seamless user experience.

---

## Technologies Used

- **Frontend**: React.js  
- **Backend**: Cloudflare Workers  
- **Validation Library**: Zod  
- **Language**: TypeScript  
- **ORM**: Prisma  
- **Database**: PostgreSQL  
- **Authentication**: JSON Web Tokens (JWT)  
- **AI Integration**: Gemini API  

---

## Features

- **User Authentication**: Secure user authentication using JWT tokens.   
- **Blogging Experience**: Write and publish blogs.   
- **Publish Control**: Articles can only be published when ready.  
- **AI-Powered Blog Generation**: Users can generate blog content using AI for inspiration or quick drafts by leveraging the Gemini API.   
- **Grammar Check**: Ensure blog quality by running a grammar check on the content using AI.   

### AI Features

1. **AI-Generated Posts**: Users can generate a blog post draft based on the title provided in the title box by clicking the "Generate with AI" button.  
2. **Grammar Correction**: Users can make their posts grammatically correct by clicking the "Grammar Check" button, ensuring polished and professional content.  

---

## Frontend

The frontend of this project is built using **React.js**, a popular JavaScript library for building user interfaces. **TypeScript** enhances code quality and provides better type safety. **Zod** is used for data validation, ensuring data integrity and consistency.

---

## Backend

The backend, powered by **Cloudflare Workers**, ensures low latency and high performance globally. Authentication is implemented using **JWT tokens** to secure endpoints and validate user access.

---

## Database

**PostgreSQL** serves as the database management system, providing reliability and scalability. **Prisma** is used as the ORM tool for seamless database interaction and efficient connection pooling.

---

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository.  
2. Install dependencies using `npm install`.  
3. Configure your PostgreSQL database and update the connection settings in the Prisma configuration file.  
4. Run database migrations using `npx prisma migrate dev`.  
5. Start the frontend and backend servers using `npm run dev`.

