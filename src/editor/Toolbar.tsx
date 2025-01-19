import React from "react";
import { ToolbarProps } from "./types/editorTypes";
import {
  isBoldActive,
  isItalicActive,
  isUnderlineActive,
  toggleBold,
  toggleItalic,
  toggleUnderline,
} from "./utils/editorUtils";
import classes from "./styles.module.css";

const Toolbar: React.FC<ToolbarProps> = ({
  editorState,
  setEditorState,
  toolbarContainerClassName,
  toolbarButtonClassName,
}) => {
  return (
    <div className={`${classes.toolbarContainer} ${toolbarContainerClassName}`}>
      <button
        onClick={() => {
          if (editorState?.getCurrentContent().getPlainText())
            setEditorState(toggleBold(editorState));
        }}
        className={`${classes.toolbarButton} ${toolbarButtonClassName} ${
          isBoldActive(editorState) ? classes.activeButton : ""
        }`}
        style={{
          fontWeight: "bold",
        }}
      >
        B
      </button>
      <button
        onClick={() => {
          if (editorState?.getCurrentContent().getPlainText())
            setEditorState(toggleItalic(editorState));
        }}
        className={`${classes.toolbarButton} ${toolbarButtonClassName} ${
          isItalicActive(editorState) ? classes.activeButton : ""
        }`}
        style={{
          fontSize: "italic",
        }}
      >
        I
      </button>
      <button
        onClick={() => {
          if (editorState?.getCurrentContent().getPlainText())
            setEditorState(toggleUnderline(editorState));
        }}
        className={`${classes.toolbarButton} ${toolbarButtonClassName} ${
          isUnderlineActive(editorState) ? classes.activeButton : ""
        }`}
        style={{
          textDecoration: "underline",
        }}
      >
        U
      </button>
    </div>
  );
};

export default Toolbar;
