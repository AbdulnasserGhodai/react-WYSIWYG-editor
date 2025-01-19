import React from "react";
import { Editor, EditorState } from "draft-js";
import Toolbar from "./Toolbar";
import classes from "./styles.module.css";
import { WysiwygEditorProps } from "./types/editorTypes";
import { useEditorLogic } from "./useEditorLogic";

export const WysiwygEditor: React.FC<WysiwygEditorProps> = ({
  value,
  onChange,
  renderToolbar,
  className,
  style,
  placeholder,
  toolbarButtonClassName,
  toolbarContainerClassName,
  fakeAPISimulation,
}) => {
  const { handleEditorChange, handleSaveContent, editorState, setEditorState } =
    useEditorLogic({ value, fakeAPISimulation, onChange });

  const toolbarProps = {
    editorState,
    setEditorState: handleEditorChange,
    containerClassName: toolbarContainerClassName,
    buttonsClassName: toolbarButtonClassName,
  };

  return (
    <div
      className={`${classes.container} ${className}`}
      style={style}
      onClick={() => {
        if (!editorState?.getCurrentContent().getPlainText())
          setEditorState(EditorState.moveFocusToEnd(editorState));
      }}
    >
      {renderToolbar ? (
        renderToolbar(toolbarProps)
      ) : (
        <Toolbar {...toolbarProps} />
      )}
      {/* @ts-ignore*/}
      <Editor
        editorState={editorState}
        onChange={handleEditorChange}
        placeholder={placeholder}
      />

      {fakeAPISimulation && (
        <button
          className={classes.saveButton}
          onClick={() => handleSaveContent()}
        >
          Save
        </button>
      )}
    </div>
  );
};
