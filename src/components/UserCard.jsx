import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id: userId, firstName, lastName, about, age, gender, photos } = user;
  const dispatch = useDispatch();
  const updateRequestStatus = async (status, userId) => {
    try {
      const updatedRequest = await fetch(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {
          method: "POST",
          credentials: "include",
          header: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!updatedRequest.ok) {
        const error = await updatedRequest.json();
        throw new Error(error.error || "Unable to fetch connection requests");
      }

      const data = await updatedRequest.json();
      // console.log(data);
      if (!data?.data) {
        throw new Error("Unable to fetch connection requests");
      }
      dispatch(removeUserFeed(userId));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      <figure>
        <img src={photos} alt="Photos" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {gender && age && (
          <p>
            {age} , {gender}
          </p>
        )}
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => updateRequestStatus("ignored", userId)}
          >
            Ignored
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => updateRequestStatus("interested", userId)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
