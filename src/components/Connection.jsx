const Connection = ({ connection }) => {
  const { firstName, lastName, gender, about, age, photos } = connection;
  return (
    <div>
      <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
        <div>
          <img src={photos} className="w-20 h-20 rounded-full object-cover" />
        </div>
        <div className="text-left mx-4 ">
          <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
          {gender && age && <p>{age + ", " + gender}</p>}
          <p>{about}</p>
        </div>
      </div>
    </div>
  );
};

export default Connection;
