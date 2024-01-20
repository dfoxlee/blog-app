import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";

function App() {
   const [user, setUser] = useState({
      userId: "",
      username: "",
      userEmail: "",
      token: "",
   });

   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home user={user} setUser={setUser} />} />
            <Route
               path="/auth/:authType"
               element={<Auth setUser={setUser} />}
            />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
