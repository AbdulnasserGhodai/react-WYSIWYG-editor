import "draft-js/dist/Draft.css";
import { WysiwygEditor } from "./editor/WysiwygEditor";
import classes from "./styles.module.css";
import { useState } from "react";

function App() {
  const [val, setVal] = useState<string | undefined>("initial value");
  const [mode, setMode] = useState<"controlled" | "uncontrolled" | "fakeAPI">(
    "uncontrolled"
  );

  return (
    <div className={classes.container}>
      <div className={classes.controlButtonsContainer}>
        <button
          className={`${classes.uncontrolledButton} ${
            mode === "uncontrolled" ? classes.activeControlButton : ""
          }`}
          onClick={() => setMode("uncontrolled")}
        >
          uncontrolled
        </button>
        <button
          className={`${classes.controlledButton} ${
            mode === "controlled" ? classes.activeControlButton : ""
          }`}
          onClick={() => setMode("controlled")}
        >
          controlled
        </button>
        <button
          className={`${classes.fakeAPIButton} ${
            mode === "fakeAPI" ? classes.activeControlButton : ""
          }`}
          onClick={() => setMode("fakeAPI")}
        >
          fake API simulation
        </button>
      </div>
      {mode === "controlled" && (
        <WysiwygEditor
          key="controlled"
          value={val}
          onChange={(content: string) => setVal(content)}
        />
      )}

      {mode === "uncontrolled" && <WysiwygEditor key="uncontrolled" />}
      {mode === "fakeAPI" && <WysiwygEditor key="fakeAPI" fakeAPISimulation />}
    </div>
  );
}

export default App;
