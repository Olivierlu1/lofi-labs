import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import { grey } from "@material-ui/core/colors";

const PlayButtonStyle = { fontSize: 100, color: grey[50] };

const PlayButton = ({ improvRNN, synth, quantizedSequence, Note }) => {
  const [playState, setPlayState] = useState(true);

  const handleClick = () => {
    setPlayState(!playState);
    if (playState === true && improvRNN) startProgram(improvRNN);
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

      const playGeneratedMelody = () => {
        console.log(1);
        improvisedMelody.notes.forEach(note => {
          synth.triggerAttackRelease(
            Note.fromMidi(note.pitch),
            note.quantizedEndStep - note.quantizedStartStep,
            note.quantizedStartStep
          );
        });
      };

      playGeneratedMelody();
      setPlayState(true);
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
