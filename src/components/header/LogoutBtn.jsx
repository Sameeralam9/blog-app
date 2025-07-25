import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";
function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    try {
      authService
        .logout()
        .then(() => {
          dispatch(logout());
        })
        .then(() => navigate("/"));
    } catch (error) {
      console.log("error in logoutbtn during logout ::", error);
    }
  };

  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
