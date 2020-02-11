import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import { grey } from "@material-ui/core/colors";
import audioGif from "../assets/audioGIF.gif";
import LikeButton from "./LikeButton";

const PlayButtonStyle = { fontSize: 100, color: grey[50] };

const PlayButton = ({ improvRNN, quantizedSequence, DRUMS, rnnPlayer }) => {
  const [playState, setPlayState] = useState(true);

  const handleClick = () => {
    setPlayState(!playState);
    if (playState === true && improvRNN) startProgram(improvRNN);
    if (playState === false) rnnPlayer.stop();
  };

  function renderGif() {
    if (playState) {
      return <img src={audioGif} alt="audio visualizer" />;
    }
    return <div className="container2"></div>;
  }

  async function startProgram(improvRNN) {
    try {
      await improvRNN.initialize();
      let improvisedMelody = await improvRNN.continueSequence(
        quantizedSequence,
        16,
        1.5,
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

      improvisedMelody.notes.forEach(function(n) {
        return (n.program = 14);
      });

      improvisedMelody.notes.push(...DRUMS.notes);

      rnnPlayer.start(improvisedMelody).then(() => {
        console.log("restarting");
        rnnPlayer.stop();
        startProgram(improvRNN);
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="wrapper">
      <div className = "container2">
        <div className = "visualizer">
          {!playState ? <img src={audioGif} alt="audio visualizer" /> : null}
        </div>
      </div>
      <div className="container1">
        <LikeButton isLikeButton={false} />
        <IconButton onClick={handleClick}>
          {playState ? (
            <PlayCircleOutlineIcon style={PlayButtonStyle} />
          ) : (
            <PauseCircleOutlineIcon style={PlayButtonStyle} />
          )}
        </IconButton>
        <LikeButton isLikeButton={true} />
        </div>
        <br />
      
      </div>
  );
};

export default PlayButton;
