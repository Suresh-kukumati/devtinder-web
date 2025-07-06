import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { useEffect } from "react";
import Connection from "./Connection";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const fetchConnection = async () => {
    try {
      const fetchData = await fetch(BASE_URL + "/user/connections", {
        method: "GET",
        credentials: "include",
        headers: {
          "content-Type": "application/json",
        },
      });

      if (!fetchData.ok) {
        const error = await fetchData.json();
        throw new Error(error.error || "somthing went wrong, unable to fetch");
      }

      const data = await fetchData.json();
      dispatch(addConnections(data.data));
      // console.log(data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return <h1 className="flex justify-center my-10">No connection found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections &&
        connections.map((connection) => {
          return <Connection key={connection._id} connection={connection} />;
        })}
    </div>
  );
};

export default Connections;
