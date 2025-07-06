import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./userCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const fetchFeed = async () => {
    if (feed) return;
    try {
      const fetchData = await fetch(BASE_URL + "/user/feed", {
        method: "GET",
        credentials: "include",
        header: {
          "Content-Type": "application/json",
        },
      });

      const data = await fetchData.json();
      // console.log(data);
      dispatch(addFeed(data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (!feed) return;

  if (feed.length === 0)
    return <h1 className="flex justify-center my-10"> No feed Found</h1>;

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
