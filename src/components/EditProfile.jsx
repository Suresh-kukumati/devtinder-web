import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [photos, setPhotos] = useState(user.photos);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  //   const handleUPdateProfile = async () => {
  //     const updateData = await fetch(
  //       BASE_URL + "/profile/edit",
  //       {
  //         firstName,
  //         lastName,
  //         age,
  //         photos,
  //         gender,
  //         about,
  //       },
  //       {
  //         method: "POST",
  //         credentials: "include",
  //         header: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const data = await updateData.json();
  //     dispatch(addUser(data.data));
  //   };
  const handleUPdateProfile = async () => {
    try {
      const response = await fetch(BASE_URL + "/profile/edit", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          age,
          photos,
          gender,
          about,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }

      const data = await response.json();
      dispatch(addUser(data.data));
      setError("");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
      // Optionally show error to user here
    }
  };
  return (
    <div className="flex my-5 mx-5 justify-center">
      <div className=" justify-items-center mx-5">
        <div className="card bg-base-200 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Profile Update</h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photos URL</legend>
              <input
                type="text"
                value={photos}
                onChange={(e) => setPhotos(e.target.value)}
                className="input"
                placeholder="photos"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <p className="text-red-500">{error}</p>
            {showToast && (
              <div className="toast toast-top toast-center z-10">
                <div className="alert alert-success">
                  <span>Profile updated successfully</span>
                </div>
              </div>
            )}
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleUPdateProfile}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <UserCard user={{ firstName, lastName, about, gender, photos, age }} />
      </div>
    </div>
  );
};

export default EditProfile;
