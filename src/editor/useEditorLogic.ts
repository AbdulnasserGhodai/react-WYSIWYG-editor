import { ContentState, EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { fakeApiCall } from "./utils/editorUtils";
import { EditorLogicProps } from "./types/editorTypes";

export const useEditorLogic = ({
  value,
  fakeAPISimulation,
  onChange,
}: EditorLogicProps) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    const content: string = editorState.getCurrentContent().getPlainText();
    if (value && value !== content) {
      setEditorState(
        EditorState.createWithContent(ContentState.createFromText(value))
      );
    }
  }, [value, editorState]);

  useEffect(() => {
    const fetchData = async () => {
      const initialContent = await new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve("This is some initial content from a fake API!");
        }, 2000);
      });

      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromText(initialContent)
        )
      );
    };

    if (fakeAPISimulation) fetchData();
  }, [fakeAPISimulation]);

  const handleSaveContent = async () => {
    const content = editorState.getCurrentContent().getPlainText();
    try {
      const response = await fakeApiCall(
        content,
        "Content successfully saved!",
        "Failed to save content. Please try again later."
      );
      console.log(response);
      alert(response?.message);
    } catch (error) {
      console.error("Error sending content to API", error);
      alert("Error sending content to API");
    }
  };

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    if (onChange) {
      const content = state.getCurrentContent().getPlainText();
      onChange(content);
    }
  };

  return {
    handleEditorChange,
    handleSaveContent,
    editorState,
    setEditorState,
  };
};
