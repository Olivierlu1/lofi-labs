import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { grey, blue } from "@material-ui/core/colors";
import Modal from 'react-modal';

const LikeButton = ({ isLikeButton, chordsCallback }) => {
  const [likeState, setLikeState] = useState(false);


  const handleClick = () => {
    setLikeState(!likeState);
    if (!isLikeButton) {
      chordsCallback();
    }
    setModalIsOpen(!modalIsOpen);
  };

  const[modalIsOpen,setModalIsOpen] = useState(false);

  return (
    <IconButton onClick={handleClick} >
      {isLikeButton ? (
        <ThumbUpIcon
          style={{ fontSize: 70, color: likeState ? grey[50] : blue[900] }}
        />
      ) : (
        <ThumbDownIcon
          style={{ fontSize: 70, color: likeState ? grey[50] : blue[900] }}
        />
      )}
      <Modal isOpen={modalIsOpen}>
        <div>
             <p>Sign in to save preferences</p>
        <div> 
            <button onClick={handleClick}>Close</button>
        </div>
        </div>
    </Modal>
    </IconButton>
  );
};

export default LikeButton;
