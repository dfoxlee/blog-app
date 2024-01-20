import { useState } from "react";

import styles from "../styles/BlogCreator.module.css";

export const BlogCreator = ({ user, setBlogs }) => {
   const [blogInput, setBlogInput] = useState("");

   const addNewBlog = async (e) => {
      e.preventDefault();

      const body = JSON.stringify({
         blog: blogInput,
         userEmail: user.userEmail,
         username: user.username,
         userId: user.userId
      })

      const newBlog = await fetch('http://localhost:8000/api/v1/blogs', {
         method: 'POST',
         headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
         },
         body: body
      });
      console.log(newBlog.body);

      setBlogs(prev => [...prev, newBlog.body])
      setBlogInput('');
   };

   const updateBlogInput = (e) => {
      setBlogInput(e.target.value);
   };

   return (
      <div className={styles.container}>
         <form className={styles.formWrapper} onSubmit={addNewBlog}>
            <h2
               className={styles.title}
            >{`What's on your mind ${user.username}?`}</h2>
            <div className={styles.inputWrapper}>
               <input
                  className={styles.input}
                  type="text"
                  value={blogInput}
                  onChange={updateBlogInput}
               />
               <button className={styles.inputBtn} onClick={addNewBlog}>
                  +
               </button>
            </div>
         </form>
      </div>
   );
};
