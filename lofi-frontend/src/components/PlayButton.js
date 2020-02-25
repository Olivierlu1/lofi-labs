import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import { grey } from "@material-ui/core/colors";
import { chord } from "@tonaljs/chord";
import { toMidi } from "@tonaljs/midi";
import audioGif from "../assets/audioGIF.gif";
import LikeButton from "./LikeButton";
import Header from "./header";
import audioPNG from "../assets/stillAudio.png";

const PlayButtonStyle = { fontSize: 100, color: grey[50] };

const PlayButton = ({
  improvRNN,
  quantizedSequence,
  DRUMS,
  rnnPlayer,
  chordProgression
}) => {
  const [playState, setPlayState] = useState(true);

  const handleClick = () => {
    setPlayState(!playState);
    if (playState === true && improvRNN) startProgram(improvRNN, 0);
    if (playState === false) rnnPlayer.stop();
  };

  function chordToNoteSequence(chordName, startStep, endStep, instrument = 0) {
    let noteSequence = [];
    for (let note of chord(chordName).notes) {
      note = note + "3";
      noteSequence.push({
        pitch: toMidi(note),
        quantizedStartStep: startStep,
        quantizedEndStep: endStep,
        program: instrument
      });
    }
    return noteSequence;
  }

  async function startProgram(improvRNN, chordIndex) {
    try {
      await improvRNN.initialize();
      let improvisedMelody = await improvRNN.continueSequence(
        quantizedSequence,
        16,
        1.2,
        [chordProgression[chordIndex]]
      );

      improvisedMelody.notes.forEach(function(n) {
        return (n.program = 0);
      });

      improvisedMelody.notes.push(...DRUMS.notes);

      const chordNotes = chordToNoteSequence(
        chordProgression[chordIndex],
        0,
        16,
        4
      );
      improvisedMelody.notes.push(...chordNotes);
      console.log(improvisedMelody);
      improvisedMelody.tempos = [{ time: 0, qpm: 100 }];

      rnnPlayer.start(improvisedMelody).then(() => {
        console.log("restarting");
        startProgram(improvRNN, (chordIndex + 1) % 4);
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className="wrapper">
        <div className="header">
          <Header />
        </div>
        <div className="container3">
          <div className="container2">
            {!playState ? (
              <img src={audioGif} alt="audio visualizer" />
            ) : (
              <img src={audioPNG} alt="audio visualizer" />
            )}
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
        </div>
        <br />
      </div>
    </div>
  );
};

export default PlayButton;
