import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const PublicRoute = ({ children }) => {
  // console.log("✅ PublicRoute component loaded");
  const user = useSelector((store) => store.user);

  return user ? <Navigate to="/" /> : children;
};

export default PublicRoute;
