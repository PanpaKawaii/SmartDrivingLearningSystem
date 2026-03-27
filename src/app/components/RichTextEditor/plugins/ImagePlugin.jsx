import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $insertNodes,
  COMMAND_PRIORITY_EDITOR,
  DRAGOVER_COMMAND,
  DROP_COMMAND,
  PASTE_COMMAND,
  createCommand,
} from "lexical";
import { $createImageNode } from "../nodes/ImageNode";

export const INSERT_IMAGE_COMMAND = createCommand("INSERT_IMAGE_COMMAND");

export default function ImagePlugin({
  enableImage = false,
  canInsertImage = false,
  imageFeatures = {},
  imageUploadConfig = {},
}) {
  const [editor] = useLexicalComposerContext();
  const supportsImageInsert = Boolean(enableImage && canInsertImage);
  const canUploadImageFromDnD = Boolean(supportsImageInsert && imageFeatures?.dragDrop);
  const canUploadImageFromPaste = Boolean(supportsImageInsert && imageFeatures?.paste);
  const canUploadImage = Boolean(
    imageUploadConfig?.entityId
      && imageUploadConfig?.imageTarget
      && typeof imageUploadConfig?.uploadHandler === "function",
  );

  const resolveUploadedImageUrl = (payload) => {
    if (!payload) return "";

    if (typeof payload === "string") {
      return payload.trim();
    }

    if (Array.isArray(payload)) {
      return resolveUploadedImageUrl(payload[0]);
    }

    if (typeof payload === "object") {
      return (
        payload.fileUrl
        || payload.url
        || payload.path
        || payload.secureUrl
        || payload.location
        || ""
      ).toString().trim();
    }

    return "";
  };

  const extractImageFilesFromDataTransfer = (dataTransfer) => {
    if (!dataTransfer?.files) return [];
    return Array.from(dataTransfer.files).filter((file) => file?.type?.startsWith("image/"));
  };

  const extractImageFilesFromClipboard = (event) => {
    const items = Array.from(event?.clipboardData?.items || []);
    const files = items
      .filter((item) => item.kind === "file" && item.type?.startsWith("image/"))
      .map((item) => item.getAsFile())
      .filter(Boolean);

    if (files.length > 0) {
      return files;
    }

    return Array.from(event?.clipboardData?.files || []).filter((file) => file?.type?.startsWith("image/"));
  };

  const insertImageByUrl = (src, alt = "") => {
    if (!src) return;
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
      src,
      alt,
      width: "100%",
      height: "auto",
    });
  };

  const uploadAndInsertFirstImage = async (files) => {
    if (!canUploadImage || files.length === 0) return;

    const uploadResult = await imageUploadConfig.uploadHandler({
      files,
      entityId: imageUploadConfig.entityId,
      imageTarget: imageUploadConfig.imageTarget,
    });

    const uploadedImageUrl = resolveUploadedImageUrl(uploadResult);
    if (!uploadedImageUrl) {
      throw new Error("Upload succeeded but no image URL returned.");
    }

    insertImageByUrl(uploadedImageUrl, files[0]?.name || "Image");
  };

  useEffect(() => {
    const removeInsertCommand = editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload) => {
        if (!supportsImageInsert) {
          return false;
        }

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

    const removeDragOverCommand = editor.registerCommand(
      DRAGOVER_COMMAND,
      (event) => {
        if (!canUploadImageFromDnD || !canUploadImage) return false;
        const imageFiles = extractImageFilesFromDataTransfer(event?.dataTransfer);
        if (imageFiles.length === 0) return false;

        event.preventDefault();
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    const removeDropCommand = editor.registerCommand(
      DROP_COMMAND,
      (event) => {
        if (!canUploadImageFromDnD || !canUploadImage) return false;

        const imageFiles = extractImageFilesFromDataTransfer(event?.dataTransfer);
        if (imageFiles.length === 0) return false;

        event.preventDefault();
        uploadAndInsertFirstImage(imageFiles).catch((error) => {
          console.error("Drop image upload failed:", error);
        });

        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    const removePasteCommand = editor.registerCommand(
      PASTE_COMMAND,
      (event) => {
        if (!canUploadImageFromPaste || !canUploadImage) return false;

        const imageFiles = extractImageFilesFromClipboard(event);
        if (imageFiles.length === 0) return false;

        event.preventDefault();
        uploadAndInsertFirstImage(imageFiles).catch((error) => {
          console.error("Paste image upload failed:", error);
        });

        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    return () => {
      removeInsertCommand();
      removeDragOverCommand();
      removeDropCommand();
      removePasteCommand();
    };
  }, [
    editor,
    supportsImageInsert,
    canUploadImageFromDnD,
    canUploadImageFromPaste,
    canUploadImage,
    imageUploadConfig,
  ]);

  return null;
}