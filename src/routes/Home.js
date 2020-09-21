import React, { useEffect, useState } from "react";
import { dbService } from "fbase";

const Home = () => {
  const [sytweet, setSytweet] = useState("");
  const [sytweets, setSytweets] = useState([]);

  const getSyweets = async () => {
    const dbSytweets = await dbService.collection("sytweets").get();
    dbSytweets.forEach((document) => {
      const sytweetObject = {
        ...document.data(),
        id: document.id,
      };
      setSytweets((prev) => [sytweetObject, ...prev]);
    });
  };

  useEffect(() => {
    getSyweets();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("sytweets").add({
      sytweet,
      createdAt: Date.now(),
    });
    setSytweet("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setSytweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={sytweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Sytweet" />
      </form>
      <div>
        {sytweets.map((sytweet) => (
          <div key={sytweet.id}>
            <h4>{sytweet.sytweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
