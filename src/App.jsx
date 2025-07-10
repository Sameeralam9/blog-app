import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "../src/store/authSlice";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
function App() {
  const [loding, setLoding] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentAccount()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoding(false));
  }, []);
  return !loding ? (
    <div className="min-h-screen flex flex-wrap content-between ">
      <div className=" w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
