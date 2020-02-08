import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import { grey } from "@material-ui/core/colors";
import audioGif from "../assets/audioGIF.gif";
import LikeButton from "./LikeButton";

const PlayButtonStyle = { fontSize: 100, color: grey[50] };

const PlayButton = ({ improvRNN, quantizedSequence, currPlayer }) => {
  const [playState, setPlayState] = useState(true);

  const handleClick = () => {
    setPlayState(!playState);
    if (playState === true && improvRNN) startProgram(improvRNN);
    if (playState === false) currPlayer.stop();
  };

  function renderGif() {
    if (playState) {
      return <img src={audioGif} alt="audio visualizer" />;
    }
    return <div></div>;
  }

  async function startProgram(improvRNN) {
    try {
      await improvRNN.initialize();
      let improvisedMelody = await improvRNN.continueSequence(
        quantizedSequence,
        60,
        2.0,
        [
          "Gm",
          "Em",
          "D",
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

      improvisedMelody.notes.forEach(function (n) {
        return n.program = 11; //Change this number to change the instrument
      });

      currPlayer.start(improvisedMelody).then(() => {
        console.log("restarting");
        startProgram(improvRNN);
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <LikeButton isLikeButton={false} />
      <IconButton onClick={handleClick}>
        {playState ? (
          <PlayCircleOutlineIcon style={PlayButtonStyle} />
        ) : (
          <PauseCircleOutlineIcon style={PlayButtonStyle} />
        )}
      </IconButton>
      <LikeButton isLikeButton={true} />
      <br />
      {!playState ? <img src={audioGif} alt="audio visualizer" /> : null}
    </div>
  );
};

export default PlayButton;
