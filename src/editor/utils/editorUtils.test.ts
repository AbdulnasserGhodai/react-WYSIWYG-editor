import { RichUtils } from "draft-js";
import {
  toggleBold,
  toggleItalic,
  toggleUnderline,
  isBoldActive,
  isItalicActive,
  isUnderlineActive,
  fakeApiCall,
} from "./editorUtils";

jest.useFakeTimers();

jest.mock("draft-js", () => ({
  EditorState: {
    createEmpty: jest.fn(),
    createWithContent: jest.fn(),
    push: jest.fn(),
  },
  RichUtils: {
    toggleInlineStyle: jest.fn(),
  },
}));

describe("EditorUtils", () => {
  let editorState: any;

  beforeEach(() => {
    editorState = {
      getCurrentInlineStyle: jest.fn(),
      push: jest.fn(),
    };
  });

  describe("toggleBold", () => {
    it("should toggle BOLD style on the editorState", () => {
      // @ts-ignore
      RichUtils.toggleInlineStyle.mockReturnValue(editorState);

      const result = toggleBold(editorState);

      expect(RichUtils.toggleInlineStyle).toHaveBeenCalledWith(
        editorState,
        "BOLD"
      );
      expect(result).toBe(editorState);
    });
  });

  describe("toggleItalic", () => {
    it("should toggle ITALIC style on the editorState", () => {
      // @ts-ignore
      RichUtils.toggleInlineStyle.mockReturnValue(editorState);

      const result = toggleItalic(editorState);

      expect(RichUtils.toggleInlineStyle).toHaveBeenCalledWith(
        editorState,
        "ITALIC"
      );
      expect(result).toBe(editorState);
    });
  });

  describe("toggleUnderline", () => {
    it("should toggle UNDERLINE style on the editorState", () => {
      // @ts-ignore
      RichUtils.toggleInlineStyle.mockReturnValue(editorState);

      const result = toggleUnderline(editorState);

      expect(RichUtils.toggleInlineStyle).toHaveBeenCalledWith(
        editorState,
        "UNDERLINE"
      );
      expect(result).toBe(editorState);
    });
  });

  describe("isBoldActive", () => {
    it("should return true if BOLD is active", () => {
      editorState.getCurrentInlineStyle.mockReturnValue(new Set(["BOLD"]));

      const result = isBoldActive(editorState);

      expect(result).toBe(true);
    });

    it("should return false if BOLD is not active", () => {
      editorState.getCurrentInlineStyle.mockReturnValue(new Set());

      const result = isBoldActive(editorState);

      expect(result).toBe(false);
    });
  });

  describe("isItalicActive", () => {
    it("should return true if ITALIC is active", () => {
      editorState.getCurrentInlineStyle.mockReturnValue(new Set(["ITALIC"]));

      const result = isItalicActive(editorState);

      expect(result).toBe(true);
    });

    it("should return false if ITALIC is not active", () => {
      editorState.getCurrentInlineStyle.mockReturnValue(new Set());

      const result = isItalicActive(editorState);

      expect(result).toBe(false);
    });
  });

  describe("isUnderlineActive", () => {
    it("should return true if UNDERLINE is active", () => {
      editorState.getCurrentInlineStyle.mockReturnValue(new Set(["UNDERLINE"]));

      const result = isUnderlineActive(editorState);

      expect(result).toBe(true);
    });

    it("should return false if UNDERLINE is not active", () => {
      editorState.getCurrentInlineStyle.mockReturnValue(new Set());

      const result = isUnderlineActive(editorState);

      expect(result).toBe(false);
    });
  });

  describe("fakeApiCall", () => {
    it("should resolve successfully with the correct data on success", async () => {
      const content = "Test content";
      const successMessage = "Content successfully saved!";
      const failMessage = "Failed to save content.";

      jest.spyOn(global.Math, "random").mockReturnValue(0.9);

      const result = fakeApiCall(content, successMessage, failMessage);

      jest.runAllTimers();

      await expect(result).resolves.toEqual({
        status: 200,
        message: successMessage,
        data: content,
      });
    });

    it("should reject with the correct error message on failure", async () => {
      const content = "Test content";
      const successMessage = "Content successfully saved!";
      const failMessage = "Failed to save content.";

      jest.spyOn(global.Math, "random").mockReturnValue(0.2);

      const result = fakeApiCall(content, successMessage, failMessage);

      jest.runAllTimers();

      await expect(result).rejects.toEqual({
        status: 500,
        message: failMessage,
      });
    });

    it("should handle timing and resolve or reject after 1 second", async () => {
      const content = "Test content";
      const successMessage = "Content successfully saved!";
      const failMessage = "Failed to save content.";

      jest.spyOn(global.Math, "random").mockReturnValue(0.9);

      const startTime = Date.now();
      const result = fakeApiCall(content, successMessage, failMessage);

      jest.runAllTimers();

      await expect(result).resolves.toEqual({
        status: 200,
        message: successMessage,
        data: content,
      });

      const elapsedTime = Date.now() - startTime;
      expect(elapsedTime).toBeGreaterThanOrEqual(1000);
    });
  });
});
