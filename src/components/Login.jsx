import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [error, setError] = useState("");
  const [loginForm, setLoginForm] = useState(true);
  const dispatch = useDispatch();

  const handleLoginFunction = async () => {
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

  const handleSignUpFunction = async () => {
    try {
      const signUpUser = await fetch(BASE_URL + "/signUp", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          emailId,
          password,
        }),
      });

      if (!signUpUser.ok) {
        const errors = await signUpUser.json();
        throw new Error(errors.error || "Something went wrong");
      }
      const data = await signUpUser.json();
      console.log(data);
      dispatch(addUser(data.data));
      return navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="my-10 justify-items-center">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {loginForm ? "Login" : "Sign Up"}
          </h2>
          {!loginForm && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input"
                  placeholder="Enter a first name"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input"
                  placeholder="Enter a last name"
                />
              </fieldset>
            </>
          )}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="text"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input"
              placeholder="Enter a email id"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Enter a password"
            />
          </fieldset>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={loginForm ? handleLoginFunction : handleSignUpFunction}
            >
              Submit
            </button>
          </div>
          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setLoginForm((value) => !value)}
          >
            {loginForm ? "New user? Signup here" : "Existing user? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
