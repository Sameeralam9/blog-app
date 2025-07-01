import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authslice.js";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

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
  return loding ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Header />
      <main>Outlet</main>
      <Footer />
    </div>
  );
}

export default App;
