import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your Sytweet"
              value={newSytweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Sytweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{sytweetObj.text}</h4>
          {sytweetObj.attachmentUrl && <img src={sytweetObj.attachmentUrl} />}
          {isOwner && (
            <div class="nweet__actions">
              <span onClick={onDeleteClick}>
                {" "}
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Sytweet;
