import React from "react";
import "./App.css";
import PlayButton from "./components/PlayButton";
import * as mm from "@magenta/music";

function App() {
  const player = new mm.Player();
  const drums = {
    notes: [
      { pitch: 36, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
      { pitch: 38, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
      { pitch: 42, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
      { pitch: 46, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
      { pitch: 42, quantizedStartStep: 2, quantizedEndStep: 3, isDrum: true },
      { pitch: 42, quantizedStartStep: 3, quantizedEndStep: 4, isDrum: true },
      { pitch: 42, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
      { pitch: 50, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
      { pitch: 36, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
      { pitch: 38, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
      { pitch: 42, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
      { pitch: 45, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
      { pitch: 36, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
      { pitch: 42, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
      { pitch: 46, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
      { pitch: 42, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
      { pitch: 48, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
      { pitch: 50, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true }
    ],
    quantizationInfo: { stepsPerQuarter: 4 },
    tempos: [{ time: 0, qpm: 120 }],
    totalQuantizedSteps: 11
  };

  const piano = {
    notes: [
      { pitch: 60, startTime: 0.0, endTime: 0.5 },
      { pitch: 60, startTime: 0.5, endTime: 1.0 },
      { pitch: 67, startTime: 1.0, endTime: 1.5 },
      { pitch: 67, startTime: 1.5, endTime: 2.0 },
      { pitch: 69, startTime: 2.0, endTime: 2.5 },
      { pitch: 69, startTime: 2.5, endTime: 3.0 },
      { pitch: 67, startTime: 3.0, endTime: 4.0 },
      { pitch: 65, startTime: 4.0, endTime: 4.5 },
      { pitch: 65, startTime: 4.5, endTime: 5.0 },
      { pitch: 64, startTime: 5.0, endTime: 5.5 },
      { pitch: 64, startTime: 5.5, endTime: 6.0 },
      { pitch: 62, startTime: 6.0, endTime: 6.5 },
      { pitch: 62, startTime: 6.5, endTime: 7.0 },
      { pitch: 60, startTime: 7.0, endTime: 8.0 }
    ],
    totalTime: 8
  };

  return (
    <div>
      <PlayButton instrument="drums" player={player} drums={drums} />
      <PlayButton instrument="piano" player={player} piano={piano} />
    </div>
  );
}

export default App;
