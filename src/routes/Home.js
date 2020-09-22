import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Sytweet from "components/Sytweet";
import SytweetFactory from "components/SytweetFactory";
import { useHistory } from "react-router-dom";

const Home = ({ userObj }) => {
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

  return (
    <div className="container">
      <SytweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
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
