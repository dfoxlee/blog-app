import {useState, useEffect} from 'react';
import { BlogCreator } from "../components/BlogCreator";
import { Blogs } from "../components/Blogs";
import { Navbar } from "../components/Navbar";

export const Home = ({ user, setUser }) => {
   const [blogs, setBlogs] = useState([]);

   useEffect(() => {
      const getAllBlogs = async () => {
         const res = await fetch('http://localhost:8000/api/v1/blogs', {
            method: "GET",
            headers: {
               "Access-Control-Allow-Origin": "*",
               "Content-Type": "application/json",
            },
         })
         const data = await res.json();

         setBlogs(data.blogs);
      }

      getAllBlogs();
   }, [blogs]);

   return (
      <>
         <Navbar user={user} setUser={setUser} />
         {user.userId !== "" ? <BlogCreator user={user} setBlogs={setBlogs} /> : null}
         {blogs ? 
         <Blogs blogs={blogs} />
      : <div>loading...</div>}
      </>
   );
};
