import { FaRegThumbsUp } from "react-icons/fa";

import styles from "../styles/Blog.module.css";

export const Blog = ({ blog }) => {
   const date = new Date(blog.postDate).toLocaleDateString();

   return (
      <div className={styles.wrapper}>
         <h5 className={styles.blogUser}>{blog.username}</h5>
         <h3 className={styles.blog}>{blog.blog}</h3>
         <div className={styles.footerWrapper}>
            <h4 className={styles.postDate}>{date}</h4>
            <button className={styles.likeBtn}>
               <h5 className={styles.likeCount}>{blog.likes}</h5>
               <FaRegThumbsUp className={styles.thumbsIcon} />
            </button>
         </div>
      </div>
   );
};
