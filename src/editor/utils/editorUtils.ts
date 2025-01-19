import { EditorState, RichUtils } from "draft-js";

export const toggleBold = (editorState: EditorState) => {
  return RichUtils.toggleInlineStyle(editorState, "BOLD");
};

export const toggleItalic = (editorState: EditorState) => {
  return RichUtils.toggleInlineStyle(editorState, "ITALIC");
};

export const toggleUnderline = (editorState: EditorState) => {
  return RichUtils.toggleInlineStyle(editorState, "UNDERLINE");
};

export const isBoldActive = (editorState: EditorState) => {
  return editorState?.getCurrentInlineStyle()?.has("BOLD");
};

export const isItalicActive = (editorState: EditorState) => {
  return editorState?.getCurrentInlineStyle()?.has("ITALIC");
};

export const isUnderlineActive = (editorState: EditorState) => {
  return editorState?.getCurrentInlineStyle()?.has("UNDERLINE");
};

export const fakeApiCall = (
  content: string,
  successMessage: string,
  failMessage: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3;

      if (isSuccess) {
        resolve({
          status: 200,
          message: successMessage,
          data: content,
        });
      } else {
        reject({
          status: 500,
          message: failMessage,
        });
      }
    }, 1000);
  });
};
