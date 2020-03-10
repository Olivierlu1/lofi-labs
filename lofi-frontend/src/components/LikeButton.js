import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { grey, blue } from "@material-ui/core/colors";
import Modal from 'react-modal';

const LikeButton = ({ isLikeButton, chordsCallback, currUser }) => {
  const [likeState, setLikeState] = useState(false);


  const handleClick = () => {
    if (Object.keys(currUser).length < 1){
    setModalIsOpen(!modalIsOpen);
    }
    setLikeState(!likeState);
    if (!isLikeButton) {
      chordsCallback();
    }
    chordsCallback();
  };

  const[modalIsOpen,setModalIsOpen] = useState(false);

  return (
    <IconButton onClick={handleClick} >
      {isLikeButton ? (
        <ThumbUpIcon
          style={{ fontSize: 70, color: likeState ? grey[50] : '#a9c5c9' }}
        />
      ) : (
        <ThumbDownIcon
          style={{ fontSize: 70, color: likeState ? grey[50] : '#a9c5c9' }}
        />
      )}
      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)}
        className = "popup_content"
        overlayClassName = "popup"
      >
        <p className="popup_text">Log in to save personalized lo-fi music</p>
          <button onClick={handleClick} className="closebutton">Close</button>
    </Modal>
    </IconButton>
  );
};

export default LikeButton;
