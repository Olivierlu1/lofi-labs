import React, { useState } from "react";

const PlayButton = ({
  instrument,
  improvRNN,
  synth,
  quantizedSequence,
  Note
}) => {
  const [playState, setPlayState] = useState(false);

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
        return true;
      };

      playGeneratedMelody();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleClick}>
      {instrument + (playState ? " play" : " pause")}
    </button>
  );
};

export default PlayButton;
