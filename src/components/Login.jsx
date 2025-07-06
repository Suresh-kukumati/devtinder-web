import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState("pratibha@gmail.com");
  const [password, setPassword] = useState("Pratibha@123");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmitFunction = async () => {
    try {
      const res = await fetch(BASE_URL + "/login", {
        method: "POST",
        credentials: "include", // like withCredentials: true in axios
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: emailId,
          password: password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to login");
      }

      const data = await res.json();
      dispatch(addUser(data.data));
      return navigate("/");
    } catch (err) {
      // console.log(err.message, "My error");
      setError(err.message);
    }
  };
  return (
    <div className="my-10 justify-items-center">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="text"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input"
              placeholder="Type here"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Type here"
            />
          </fieldset>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleSubmitFunction}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
