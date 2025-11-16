import React from "react";
import { EnterPage } from "./components/enter-page";
import { useAppSelector } from "./hooks/typed-react-redux-hooks";
import { isGameActiveSelector } from "./redux/modules/app";
import { GamePage } from "./components/game-page";

function App() {
  const isGameActive = useAppSelector(isGameActiveSelector);

  return (
    <div
      style={{
        blockSize: "100%",
        inlineSize: "100%",
      }}
    >
      {!isGameActive && <EnterPage />}
      {isGameActive && <GamePage />}
    </div>
  );
}

export default App;
