import { Blog } from "./Blog";

import styles from "../styles/Blogs.module.css";

export const Blogs = ({blogs}) => {
   return (
      <div>
         <div className={styles.wrapper}>
            {blogs.map((blog, index) => (
               <Blog key={index} blog={blog} />
            ))}
         </div>
      </div>
   );
};
