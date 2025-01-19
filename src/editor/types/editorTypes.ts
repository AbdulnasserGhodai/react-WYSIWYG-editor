import { EditorState } from "draft-js";

export interface ToolbarProps {
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
  toolbarContainerClassName?: string;
  toolbarButtonClassName?: string;
}

export interface WysiwygEditorProps {
  value?: string;
  placeholder?: string;
  onChange?: (content: string) => void;
  renderToolbar?: (props: ToolbarProps) => React.ReactNode;
  className?: string;
  toolbarContainerClassName?: string;
  toolbarButtonClassName?: string;
  style?: React.CSSProperties;
  fakeAPISimulation?: boolean;
}

export interface EditorLogicProps {
  value?: string;
  fakeAPISimulation?: boolean;
  onChange?: (content: string) => void;
}
