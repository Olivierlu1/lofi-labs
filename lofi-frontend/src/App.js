import React, { useState } from "react";
import PlayButton from "./components/PlayButton";
import LikeButton from "./components/LikeButton";
import * as mm from "@magenta/music";
import * as Tonal from "tonal";
import Button from "@material-ui/core/Button";

function App() {
  const improvRNN = new mm.MusicRNN(
    "https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/chord_pitches_improv"
  );
  improvRNN.initialize();

  let rnnPlayer = new mm.SoundFontPlayer(
    "https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus"
  );

  const { midi } = Tonal;

  const sequence = {
    ticksPerQuarter: 220,
    totalTime: 28.5,
    timeSignatures: [
      {
        time: 0,
        numerator: 4,
        denominator: 4
      }
    ],
    tempos: [
      {
        time: 0,
        qpm: 60
      }
    ],
    notes: [
      { pitch: midi("G4"), quantizedStartStep: 0, quantizedEndStep: 1 },
      { pitch: midi("G4"), quantizedStartStep: 1, quantizedEndStep: 2 },
      { pitch: midi("B4"), quantizedStartStep: 2, quantizedEndStep: 3 },
      { pitch: midi("G4"), quantizedStartStep: 3, quantizedEndStep: 4 },
      { pitch: midi("D5"), quantizedStartStep: 4, quantizedEndStep: 5 },
      { pitch: midi("G4"), quantizedStartStep: 5, quantizedEndStep: 6 },
      { pitch: midi("G4"), quantizedStartStep: 6, quantizedEndStep: 7 },
      { pitch: midi("D5"), quantizedStartStep: 7, quantizedEndStep: 8 }
    ]
  };

  const DRUMS = {
    notes: [
      { pitch: 42, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
      { pitch: 36, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },

      { pitch: 42, quantizedStartStep: 2, quantizedEndStep: 3, isDrum: true },

      { pitch: 42, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
      { pitch: 38, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },

      { pitch: 42, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
      { pitch: 36, quantizedStartStep: 7, quantizedEndStep: 8, isDrum: true },
      { pitch: 42, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
      { pitch: 36, quantizedStartStep: 9, quantizedEndStep: 10, isDrum: true },

      { pitch: 42, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },

      { pitch: 42, quantizedStartStep: 12, quantizedEndStep: 13, isDrum: true },
      { pitch: 38, quantizedStartStep: 12, quantizedEndStep: 13, isDrum: true },

      { pitch: 46, quantizedStartStep: 14, quantizedEndStep: 16, isDrum: true }
    ],
    quantizationInfo: { stepsPerQuarter: 4 },
    tempos: [{ time: 0, qpm: 60 }],
    totalQuantizedSteps: 11
  };

  const quantizedSequence = mm.sequences.quantizeNoteSequence(sequence, 1);

  return (
    <div className="buttons">
      <PlayButton
        instrument="rnn"
        improvRNN={improvRNN}
        DRUMS={DRUMS}
        quantizedSequence={quantizedSequence}
        rnnPlayer={rnnPlayer}
      />
    </div>
  );
}

export default App;
