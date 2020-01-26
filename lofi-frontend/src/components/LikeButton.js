import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { grey, blue } from '@material-ui/core/colors';

const LikeButton = ({ isLikeButton }) => {
  const [likeState, setLikeState] = useState(false);

  const handleClick = () => {
    setLikeState(!likeState);
  };

  return (
    <IconButton onClick={handleClick}>
      {(isLikeButton ? <ThumbUpIcon style={{ fontSize: 70, color: (likeState ? grey[50] : blue[900]) }} />
                     : <ThumbDownIcon style={{ fontSize: 70, color: (likeState ? grey[50] : blue[900]) }} />)}
    </IconButton>
  );
};

export default LikeButton;
