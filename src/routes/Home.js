import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Sytweet from "components/Sytweet";

const Home = ({ userObj }) => {
  const [sytweet, setSytweet] = useState("");
  const [sytweets, setSytweets] = useState([]);

  useEffect(() => {
    dbService.collection("sytweets").onSnapshot((snapshot) => {
      const sytweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSytweets(sytweetArray);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("sytweets").add({
      text: sytweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
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
          <Sytweet
            key={sytweet.id}
            sytweetObj={sytweet}
            isOwner={sytweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
