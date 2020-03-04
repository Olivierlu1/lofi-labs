import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { grey, blue } from "@material-ui/core/colors";

const LikeButton = ({ isLikeButton, chordsCallback }) => {
  const [likeState, setLikeState] = useState(false);

  const handleClick = () => {
    setLikeState(!likeState);
    chordsCallback();
  };

  return (
    <IconButton onClick={handleClick}>
      {isLikeButton ? (
        <ThumbUpIcon
          style={{ fontSize: 70, color: likeState ? grey[50] : '#a9c5c9' }}
        />
      ) : (
        <ThumbDownIcon
          style={{ fontSize: 70, color: likeState ? grey[50] : '#a9c5c9' }}
        />
      )}
    </IconButton>
  );
};

export default LikeButton;
