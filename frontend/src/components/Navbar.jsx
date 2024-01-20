import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Navbar.module.css";

export const Navbar = ({ user, setUser }) => {
   const handleLogout = async (e) => {
      e.preventDefault();

      const body = JSON.stringify({
         userId: user.userId,
         token: user.token,
      });

      const res = await fetch("http://localhost:8000/api/v1/users/logout", {
         method: "POST",
         headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
         },
         body: body,
      });

      const data = await res.json();
      console.log(data);
      if (data.error) {
         return toast(data.msg);
      }

      setUser({
         userId: "",
         username: "",
         userEmail: "",
         token: "",
      })
   };
   return (
      <div className={styles.container}>
         <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
         <div className={styles.wrapper}>
            <h1 className={styles.title}>Blogg</h1>
            {user.userId !== "" ? (
               <button className={styles.authBtn} onClick={handleLogout}>
                  Logout
               </button>
            ) : (
               <div>
                  <Link className={styles.authLink} to="auth/login">
                     Login
                  </Link>
                  <Link className={styles.authLink} to="auth/signup">
                     Sign Up
                  </Link>
               </div>
            )}
         </div>
      </div>
   );
};
