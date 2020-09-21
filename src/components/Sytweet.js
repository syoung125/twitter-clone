import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Sytweet = ({ sytweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newSytweet, setNewSytweet] = useState(sytweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this sytweet?");
    if (ok) {
      await dbService.doc(`sytweets/${sytweetObj.id}`).delete();
      await storageService.refFromURL(sytweetObj.attachmentUrl).delete();
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewSytweet(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(sytweetObj, newSytweet);
    await dbService.doc(`sytweets/${sytweetObj.id}`).update({
      text: newSytweet,
    });
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your Sytweet"
              value={newSytweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Sytweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{sytweetObj.text}</h4>
          {sytweetObj.attachmentUrl && (
            <img src={sytweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Sytweet</button>
              <button onClick={toggleEditing}>Edit Sytweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Sytweet;
