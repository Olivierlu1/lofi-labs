import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import { grey } from "@material-ui/core/colors";

const PlayButtonStyle = { fontSize: 100, color: grey[50] };

const PlayButton = ({ improvRNN, quantizedSequence, rnnPlayer }) => {
  const [playState, setPlayState] = useState(true);

  const handleClick = () => {
    setPlayState(!playState);
    if (playState === true && improvRNN) startProgram(improvRNN);
    if (playState === false) rnnPlayer.stop();
  };

  const startProgram = async improvRNN => {
    try {
      await improvRNN.initialize();
      let improvisedMelody = await improvRNN.continueSequence(
        quantizedSequence,
        60,
        2.0,
        [
          "Bm",
          "Bbm",
          "Gb7",
          "F7",
          "Ab",
          "Ab7",
          "G7",
          "Gb7",
          "F7",
          "Bb7",
          "Eb7",
          "AM7"
        ]
      );

      rnnPlayer.start(improvisedMelody);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <IconButton onClick={handleClick}>
      {playState ? (
        <PlayCircleOutlineIcon style={PlayButtonStyle} />
      ) : (
        <PauseCircleOutlineIcon style={PlayButtonStyle} />
      )}
    </IconButton>
  );
};

export default PlayButton;
