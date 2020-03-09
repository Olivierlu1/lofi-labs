import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import { fromRomanNumerals } from "@tonaljs/progression";
import { favoriteHelper } from "../UserFunction";
import { grey } from "@material-ui/core/colors";
import { chord } from "@tonaljs/chord";
import { toMidi } from "@tonaljs/midi";
import audioGif from "../assets/lofi_gif.gif";
import audioPNG from "../assets/lofi_still.png";
import LikeButton from "./LikeButton";
import Title from "./Title";

const PlayButtonStyle = { fontSize: 100, color: grey[50] };

const MusicPlayer = ({
  improvRNN,
  quantizedSequence,
  DRUMS,
  rnnPlayer,
  chordProgression,
  currUser
}) => {
  const [playState, setPlayState] = useState(true);
  const [chordProgressionNumber, setChordProgressionNumber] = useState(0);
  const [tonicNumber, setTonicNumber] = useState(0);
  const [currentChords, setCurrentChords] = useState(chordProgression);
  const melodies = [];
  let timesPlayed = 0;

  const handleClick = async () => {
    setPlayState(!playState);
    if (playState === true && improvRNN) {
      await improvRNN.initialize();
      startProgram(improvRNN, 0);
    }
    if (playState === false) {
      rnnPlayer.stop();
      timesPlayed = 0;
    }
  };

  const chordProgressions = [
    ["IIm7", "V7", "IMaj7", "VI7"],
    ["IMaj7", "VIm7", "IIm7", "V7"],
    ["IIm7", "V7", "IIIm7", "VI7"],
    ["IVMaj7", "IIIm7", "IIm7", "IMaj7"]
  ];

  const notes = [
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#"
  ];

  const generateChordProgression = (chordsNum, tonicNum) => {
    chordProgression = fromRomanNumerals(
      notes[tonicNum],
      chordProgressions[chordsNum]
    );
    return chordProgression;
  };

  const changeChords = () => {
    setChordProgressionNumber(
      Math.floor(Math.random() * chordProgressions.length)
    );
    setTonicNumber(Math.floor(Math.random() * notes.length));
    setCurrentChords(
      generateChordProgression(chordProgressionNumber, tonicNumber)
    );
    rnnPlayer.stop();
    if (playState === false) startProgram(improvRNN, 0);
  };

  const likeChords = async () => {
    const result = await favoriteHelper(currentChords, currUser);
    console.log("This is the result ", result);
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
      let improvisedMelody = await improvRNN.continueSequence(
        quantizedSequence,
        16,
        0.8,
        [currentChords[chordIndex]]
      );

      // improvisedMelody.notes.forEach(function(n) {
      //   return (n.program = 0);
      // });

      improvisedMelody.notes.push(...DRUMS.notes);

      const chordNotes = chordToNoteSequence(
        currentChords[chordIndex],
        0,
        16,
        4
      );
      improvisedMelody.notes.push(...chordNotes);
      improvisedMelody.tempos = [{ time: 0, qpm: 100 }];

      if (melodies.length < 2) {
        melodies.push(improvisedMelody);
      }
      if (timesPlayed === 0) {
        start();
        timesPlayed++;
      }
      startProgram(improvRNN, (chordIndex + 1) % 4);
    } catch (error) {
      console.error(error);
    }
  }

  const start = () => {
    rnnPlayer.start(melodies.shift()).then(() => {
      console.log("restarting");
      console.log(melodies);
      start();
    });
  };

  return (
    <div>
      <title>Lofi Labs</title>
      <div className="wrapper" style={{ marginLeft: "230px" }}>
        <div className="title">
          <Title />
        </div>
        <div className="container3">
          <div className="container2">
            {!playState ? (
              <img
                src={audioGif}
                style={{ width: 550 }}
                alt="audio visualizer"
              />
            ) : (
              <img
                src={audioPNG}
                style={{ width: 550 }}
                alt="audio visualizer"
              />
            )}
          </div>
          <div className="container1">
            <LikeButton isLikeButton={false} chordsCallback={changeChords} />
            <IconButton onClick={handleClick}>
              {playState ? (
                <PlayCircleOutlineIcon style={PlayButtonStyle} />
              ) : (
                <PauseCircleOutlineIcon style={PlayButtonStyle} />
              )}
            </IconButton>
            <LikeButton isLikeButton={true} chordsCallback={likeChords} />
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default MusicPlayer;
