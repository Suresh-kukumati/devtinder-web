import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import Connection from "./Connection";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const requestConnections = async () => {
    try {
      const fetchData = await fetch(BASE_URL + "/user/requests/received", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!fetchData.ok) {
        const error = await fetchData.json();
        throw new Error(error.error || "Unable to fetch");
      }
      const data = await fetchData.json();
      dispatch(addRequest(data.data));
    } catch (err) {
      console.log(err.messagee);
    }
  };
  useEffect(() => {
    requestConnections();
  }, []);

  const reviewRequest = async (status, requestId) => {
    try {
      const fetchData = await fetch(
        BASE_URL + `/request/review/${status}/${requestId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!fetchData.ok) {
        const error = await fetchData.json();
        throw new Error(error.error || "Unable to fetch request");
      }

      dispatch(removeRequest(requestId));
    } catch (err) {
      console.log(err.messagee);
    }
  };

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {requests &&
        requests.map((request) => {
          const { photos, firstName, lastName, age, gender, about } =
            request.fromUserId;
          return (
            <div>
              <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                <div>
                  <img
                    src={photos}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
                <div className="text-left mx-4 ">
                  <h2 className="font-bold text-xl">
                    {firstName + " " + lastName}
                  </h2>
                  {gender && age && <p>{age + ", " + gender}</p>}
                  <p>{about}</p>
                </div>
                <div>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-secondary mx-2"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Requests;
