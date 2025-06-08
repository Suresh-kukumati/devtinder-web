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
        throw new Error(`HTTP error! status: ${fetchData.status}`);
      }

      const data = await fetchData.json();
      dispatch(addUser(data.data));
    } catch (err) {
      if (err.message.includes(401)) {
        return navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
