import { useDispatch } from "react-redux";
import { logout } from "../../store/authslice";
import authService from "../../appwrite/auth";
function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    try {
      authService.logout().then(() => {
        dispatch(logout());
      });
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
