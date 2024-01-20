import { useParams, Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "../styles/Auth.module.css";

export const Auth = ({ setUser }) => {
   const { authType } = useParams();
   const navigate = useNavigate();
   const [username, setUsername] = useState("");
   const [userEmail, setUserEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmedPassword] = useState("");

   const updateUsername = (e) => {
      setUsername(e.target.value);
   };

   const updateUserEmail = (e) => {
      setUserEmail(e.target.value);
   };

   const updatePassword = (e) => {
      setPassword(e.target.value);
   };

   const updateConfirmPassword = (e) => {
      setConfirmedPassword(e.target.value);
   };

   const handleAuth = async (e) => {
      e.preventDefault();

      const body =
         authType === "login"
            ? {
                 userEmail: userEmail,
                 password: password,
              }
            : {
                 userEmail: userEmail,
                 username: username,
                 password: password,
              };

      const res = await fetch(
         `http://localhost:8000/api/v1/users/${authType}`,
         {
            method: "POST",
            headers: {
               "Access-Control-Allow-Origin": "*",
               "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
         }
      );
      const data = await res.json();
      if (data.error) return toast(data.msg);
      setUser(data.user);
      navigate("/");
   };

   return (
      <div>
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
            <Link className={styles.returnLink} to="/">
               return home
            </Link>
            <form className={styles.formWrapper} onSubmit={handleAuth}>
               <RxAvatar className={styles.avatar} />
               <div className={styles.inputWrapper}>
                  <label className={styles.label} htmlFor="user-email">
                     Email:
                  </label>
                  <input
                     className={styles.input}
                     type="email"
                     name="user-email"
                     value={userEmail}
                     onChange={updateUserEmail}
                  />
               </div>
               {authType === "signup" ? (
                  <div className={styles.inputWrapper}>
                     <label className={styles.label} htmlFor="username">
                        Username:
                     </label>
                     <input
                        className={styles.input}
                        type="text"
                        name="username"
                        value={username}
                        onChange={updateUsername}
                     />
                  </div>
               ) : null}
               <div className={styles.inputWrapper}>
                  <label className={styles.label} htmlFor="password-1">
                     Password:
                  </label>
                  <input
                     className={styles.input}
                     type="password"
                     name="password-1"
                     value={password}
                     onChange={updatePassword}
                  />
               </div>
               {authType === "signup" ? (
                  <div className={styles.inputWrapper}>
                     <label className={styles.label} htmlFor="password-2">
                        Confirm Password:
                     </label>
                     <input
                        className={styles.input}
                        type="password"
                        name="password-2"
                        value={confirmPassword}
                        onChange={updateConfirmPassword}
                     />
                  </div>
               ) : null}
               {authType === "login" ? (
                  <h4 className={styles.additional}>
                     Dont have an account ?
                     <Link className={styles.navigateLink} to="/auth/signup">
                        Sign Up Here
                     </Link>
                  </h4>
               ) : (
                  <h4 className={styles.additional}>
                     Already have an account ?
                     <Link className={styles.navigateLink} to="/auth/login">
                        Login Here
                     </Link>
                  </h4>
               )}
               <button className={styles.authBtn} onClick={handleAuth}>
                  {authType === "signup" ? "Sign Up" : "Login"}
               </button>
            </form>
         </div>
      </div>
   );
};
