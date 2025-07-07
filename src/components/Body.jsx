import { BASE_URL } from "../utils/constants";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchUserData = async () => {
    if (user) return;
    try {
      const fetchData = await fetch(BASE_URL + "/profile/view", {
        method: "GET",
        credentials: "include",
        header: {
          "Content-Type": "application/json",
        },
      });

      if (!fetchData.ok) {
        const errors = await fetchData.json();
        throw new Error(errors.message || "Something went wrong");
      }

      const data = await fetchData.json();
      dispatch(addUser(data.data));
    } catch (err) {
      if (err.message.includes(401)) {
        return navigate("/login");
      }
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
