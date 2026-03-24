import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $insertNodes,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from "lexical";
import { $createImageNode } from "../nodes/ImageNode";

export const INSERT_IMAGE_COMMAND = createCommand("INSERT_IMAGE_COMMAND");

export default function ImagePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload) => {
        const src = payload?.src;
        if (!src) {
          return false;
        }

        const imageNode = $createImageNode({
          src,
          alt: payload?.alt || "",
          width: payload?.width || "100%",
          height: payload?.height || "auto",
        });

        // Insert image and a paragraph after it so user can continue typing naturally.
        $insertNodes([imageNode, $createParagraphNode()]);
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}