import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Toolbar from "./Toolbar";
import "@testing-library/jest-dom/extend-expect";
import classes from "./styles.module.css";

jest.mock("./utils/editorUtils", () => ({
  isBoldActive: jest.fn(),
  isItalicActive: jest.fn(),
  isUnderlineActive: jest.fn(),
  toggleBold: jest.fn(),
  toggleItalic: jest.fn(),
  toggleUnderline: jest.fn(),
}));

describe("Toolbar", () => {
  let editorStateMock: any;
  let setEditorStateMock: jest.Mock;

  beforeEach(() => {
    editorStateMock = {
      getCurrentContent: jest.fn().mockReturnValue({
        getPlainText: jest.fn().mockReturnValue("Some text"),
      }),
      getCurrentInlineStyle: jest.fn().mockReturnValue(new Set()),
    };
    setEditorStateMock = jest.fn();
  });

  it("should render toolbar buttons", () => {
    render(
      <Toolbar
        editorState={editorStateMock}
        setEditorState={setEditorStateMock}
      />
    );

    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("I")).toBeInTheDocument();
    expect(screen.getByText("U")).toBeInTheDocument();
  });

  it("should call setEditorState when Bold button is clicked", () => {
    const { toggleBold } = require("./utils/editorUtils");
    toggleBold.mockReturnValue(editorStateMock);

    render(
      <Toolbar
        editorState={editorStateMock}
        setEditorState={setEditorStateMock}
      />
    );

    fireEvent.click(screen.getByText("B"));
    expect(toggleBold).toHaveBeenCalledWith(editorStateMock);
    expect(setEditorStateMock).toHaveBeenCalledWith(editorStateMock);
  });

  it("should call setEditorState when Italic button is clicked", () => {
    const { toggleItalic } = require("./utils/editorUtils");
    toggleItalic.mockReturnValue(editorStateMock);

    render(
      <Toolbar
        editorState={editorStateMock}
        setEditorState={setEditorStateMock}
      />
    );

    fireEvent.click(screen.getByText("I"));
    expect(toggleItalic).toHaveBeenCalledWith(editorStateMock);
    expect(setEditorStateMock).toHaveBeenCalledWith(editorStateMock);
  });

  it("should call setEditorState when Underline button is clicked", () => {
    const { toggleUnderline } = require("./utils/editorUtils");
    toggleUnderline.mockReturnValue(editorStateMock);

    render(
      <Toolbar
        editorState={editorStateMock}
        setEditorState={setEditorStateMock}
      />
    );

    fireEvent.click(screen.getByText("U"));
    expect(toggleUnderline).toHaveBeenCalledWith(editorStateMock);
    expect(setEditorStateMock).toHaveBeenCalledWith(editorStateMock);
  });

  it('should apply the "activeButton" class when a style is active', () => {
    const {
      isBoldActive,
      isItalicActive,
      isUnderlineActive,
    } = require("./utils/editorUtils");
    isBoldActive.mockReturnValue(true);
    isItalicActive.mockReturnValue(true);
    isUnderlineActive.mockReturnValue(true);

    render(
      <Toolbar
        editorState={editorStateMock}
        setEditorState={setEditorStateMock}
      />
    );

    expect(screen.getByText("B")).toHaveClass(classes.activeButton);
    expect(screen.getByText("I")).toHaveClass(classes.activeButton);
    expect(screen.getByText("U")).toHaveClass(classes.activeButton);
  });

  it("should not call setEditorState if the content is empty", () => {
    editorStateMock.getCurrentContent().getPlainText.mockReturnValue("");
    const { toggleBold } = require("./utils/editorUtils");
    toggleBold.mockReturnValue(editorStateMock);

    render(
      <Toolbar
        editorState={editorStateMock}
        setEditorState={setEditorStateMock}
      />
    );

    fireEvent.click(screen.getByText("B"));
    expect(setEditorStateMock).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText("U"));
    expect(setEditorStateMock).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText("I"));
    expect(setEditorStateMock).not.toHaveBeenCalled();
  });
});
