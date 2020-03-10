import React, { useEffect, useState } from "react";
import MusicPlayer from "./components/MusicPlayer";
import * as mm from "@magenta/music";
import { fromRomanNumerals } from "@tonaljs/progression";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Login from "./components/Login";
import Register from "./components/Register";
import jwt_decode from "jwt-decode";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#a9c5c9",
      contrastText: "#fff",
    }
  }
});

function App() {
  const improvRNN = new mm.MusicRNN(
    "https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/chord_pitches_improv"
  );
  improvRNN.initialize();

  let rnnPlayer = new mm.SoundFontPlayer(
    "https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus"
  );

  const chordProgressions = [
    ["IIm7", "V7", "IMaj7", "VI7"],
    ["IMaj7", "VIm7", "IIm7", "V7"],
    ["IIm7", "V7", "IIIm7", "VI7"],
    ["IVMaj7", "IIIm7", "IIm7", "IMaj7"]
  ];

  const defaultChordProgression = () => {
    console.log(currUser)
    if (Object.keys(currUser).length === 0) {
      return fromRomanNumerals(
        "C",
        chordProgressions[0]
      );
    } else {
      const favChords = currUser.favoriteChords;
      return favChords[Math.floor(Math.random() * favChords.length)];
    }
  };

  const sequence = {
    quantizationInfo: { stepsPerQuarter: 2 },
    totalQuantizedSteps: 8,
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
        qpm: 110
      }
    ],
    notes: [
      { pitch: "G4", quantizedStartStep: 0, quantizedEndStep: 1 },
      { pitch: "D4", quantizedStartStep: 1, quantizedEndStep: 3 },
      { pitch: "D4", quantizedStartStep: 3, quantizedEndStep: 6 },
      { pitch: "G4", quantizedStartStep: 6, quantizedEndStep: 7 },
      { pitch: "G4", quantizedStartStep: 7, quantizedEndStep: 8 }
    ]
  };

  const DRUMS = {
    notes: [
      { pitch: 42, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
      { pitch: 36, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },

      { pitch: 42, quantizedStartStep: 2, quantizedEndStep: 3, isDrum: true },

      { pitch: 42, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
      { pitch: 37, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },

      { pitch: 42, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
      { pitch: 36, quantizedStartStep: 7, quantizedEndStep: 8, isDrum: true },
      { pitch: 42, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
      { pitch: 36, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },

      { pitch: 42, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },

      { pitch: 42, quantizedStartStep: 12, quantizedEndStep: 13, isDrum: true },
      { pitch: 37, quantizedStartStep: 12, quantizedEndStep: 13, isDrum: true },

      { pitch: 42, quantizedStartStep: 14, quantizedEndStep: 16, isDrum: true }
    ],
    quantizationInfo: { stepsPerQuarter: 8 },
    totalQuantizedSteps: 16
  };

  const [currUser, setCurrUser] = useState({});

  // Set current User
  useEffect(() => {
    if (localStorage.usertoken) {
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token, { header: true });
      setCurrUser({
        email: decoded.identity.email,
        favoriteChords: decoded.identity.favoriteChords
      });
    }
  }, []);

  console.log(currUser);
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <NavBar currUser={currUser} setCurrUser={setCurrUser} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <MusicPlayer
                instrument="rnn"
                improvRNN={improvRNN}
                DRUMS={DRUMS}
                quantizedSequence={sequence}
                rnnPlayer={rnnPlayer}
                chordProgression={defaultChordProgression}
                currUser={currUser}
              />
            )}
          />
          {/* <div className="buttons"> */}

          {/* </div> */}
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/login"
            render={() => <Login setCurrUser={setCurrUser} />}
          />
        </Switch>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
