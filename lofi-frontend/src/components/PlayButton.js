import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import { grey } from '@material-ui/core/colors';

const PlayButtonStyle = {fontSize: 100, color: grey[50]}

const PlayButton = ({ instrument, player, drums, piano }) => {
  const [playState, setPlayState] = useState(true);

  const handleClick = () => {
    setPlayState(!playState);
    if (playState === true && instrument === "drums") player.start(drums);
    if (playState === true && instrument === "piano") player.start(piano);
    if (playState === false) player.stop();
  };

  return (
    <IconButton onClick={handleClick}>
      {(playState ? <PlayCircleOutlineIcon style={PlayButtonStyle} />
                  : <PauseCircleOutlineIcon style={PlayButtonStyle} />)}
    </IconButton>
  );
};

export default PlayButton;
