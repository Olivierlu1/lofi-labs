import React, { useState } from "react";

const PlayButton = ({ instrument, player, drums, piano }) => {
  const [playState, setPlayState] = useState(true);

  const handleClick = () => {
    setPlayState(!playState);
    if (playState === true && instrument === "drums") player.start(drums);
    if (playState === true && instrument === "piano") player.start(piano);
    if (playState === false) player.stop();
  };

  return (
    <button onClick={handleClick}>
      {instrument + (playState ? " play" : " pause")}
    </button>
  );
};

export default PlayButton;
