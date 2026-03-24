// src/app/components/RichTextEditor/RichTextEditor.jsx
import { useEffect, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $createParagraphNode, $getRoot } from "lexical";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import ImagePlugin from "./plugins/ImagePlugin";
import { ImageNode } from "./nodes/ImageNode";
import "./RichTextEditor.css";

const theme = {
  root: "rte-root",
  paragraph: "rte-paragraph",
  heading: {
    h1: "rte-h1",
    h2: "rte-h2",
    h3: "rte-h3",
  },
  quote: "rte-quote",
  list: {
    ul: "rte-ul",
    ol: "rte-ol",
    listitem: "rte-listitem",
  },
  text: {
    bold: "rte-bold",
    italic: "rte-italic",
    underline: "rte-underline",
    strikethrough: "rte-strikethrough",
  },
  link: "rte-link",
};

function onError(error) {
  console.error("[RichTextEditor]", error);
}

function normalizeRichTextHtml(inputHtml) {
  const safeHtml = typeof inputHtml === "string" ? inputHtml.trim() : "";
  if (!safeHtml || typeof window === "undefined") {
    return safeHtml;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(safeHtml, "text/html");

  const normalizeElementTag = (element, targetTag) => {
    if (element.tagName === targetTag.toUpperCase()) return element;
    const replacement = doc.createElement(targetTag);
    replacement.replaceChildren(...Array.from(element.childNodes));
    element.replaceWith(replacement);
    return replacement;
  };

  const walkAndNormalize = (root) => {
    Array.from(root.childNodes).forEach((node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const element = node;

      let current = element;
      if (current.tagName === "B") {
        current = normalizeElementTag(current, "strong");
      } else if (current.tagName === "I") {
        current = normalizeElementTag(current, "em");
      } else if (current.tagName === "STRIKE") {
        current = normalizeElementTag(current, "s");
      }

      walkAndNormalize(current);

      current.removeAttribute("class");
      current.removeAttribute("style");

      if (current.tagName === "SPAN") {
        current.replaceWith(...Array.from(current.childNodes));
      }
    });
  };

  walkAndNormalize(doc.body);

  ["strong", "em", "s", "u"].forEach((tagName) => {
    doc.body.querySelectorAll(`${tagName} ${tagName}`).forEach((node) => {
      node.replaceWith(...Array.from(node.childNodes));
    });
  });

  doc.body.querySelectorAll("*").forEach((element) => {
    element.removeAttribute("class");
    element.removeAttribute("style");
  });

  const hasMediaNode =
    doc.body.querySelector(
      "img,video,audio,iframe,embed,object,svg,table,hr,ul li,ol li",
    ) !== null;
  const plainText = (doc.body.textContent || "")
    .replace(/\u00a0/g, " ")
    .trim();

  if (!hasMediaNode && plainText.length === 0) {
    return "";
  }

  return doc.body.innerHTML.trim();
}

function InitialHtmlPlugin({ initialHtml }) {
  const [editor] = useLexicalComposerContext();
  const lastAppliedHtmlRef = useRef(null);

  useEffect(() => {
    const safeHtml = normalizeRichTextHtml(initialHtml);
    if (lastAppliedHtmlRef.current === safeHtml) return;
    lastAppliedHtmlRef.current = safeHtml;

    if (typeof window === "undefined") return;

    editor.update(() => {
      const root = $getRoot();
      root.clear();

      if (!safeHtml.trim()) {
        root.append($createParagraphNode());
        return;
      }

      const parser = new DOMParser();
      const dom = parser.parseFromString(safeHtml, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);

      if (nodes.length > 0) {
        root.append(...nodes);
      } else {
        root.append($createParagraphNode());
      }
    });
  }, [editor, initialHtml]);

  return null;
}

const DEFAULT_IMAGE_FEATURES = {
  upload: true,
  url: true,
  dragDrop: true,
  paste: true,
};

const resolveImageFeatures = (enableImage, imageFeatures = {}) => {
  if (!enableImage) {
    return {
      upload: false,
      url: false,
      dragDrop: false,
      paste: false,
    };
  }

  return {
    upload:
      typeof imageFeatures.upload === "boolean"
        ? imageFeatures.upload
        : DEFAULT_IMAGE_FEATURES.upload,
    url:
      typeof imageFeatures.url === "boolean"
        ? imageFeatures.url
        : DEFAULT_IMAGE_FEATURES.url,
    dragDrop:
      typeof imageFeatures.dragDrop === "boolean"
        ? imageFeatures.dragDrop
        : DEFAULT_IMAGE_FEATURES.dragDrop,
    paste:
      typeof imageFeatures.paste === "boolean"
        ? imageFeatures.paste
        : DEFAULT_IMAGE_FEATURES.paste,
  };
};

/**
 * Props:
 *  - onChange(editorState, editor) : lắng nghe thay đổi
 *  - onHtmlChange(html) : trả về HTML
 *  - initialConfig : override LexicalComposer config (tuỳ chọn)
 *  - placeholder : text placeholder (default: "Nhập nội dung...")
 *  - initialHtml : HTML ban đầu để prefill khi edit
 *  - enableImage : bật/tắt toàn bộ tính năng ảnh
 *  - imageFeatures : override chi tiết { upload, url, dragDrop, paste }
 *  - imageUploadConfig : config upload ảnh { entityId, imageTarget, uploadHandler, deleteHandler }
 *  - readOnly : boolean
 *  - autoFocus : boolean
 */
export default function RichTextEditor({
  onChange,
  onHtmlChange,
  placeholder = "Nhập nội dung...",
  initialHtml = "",
  enableImage = false,
  imageFeatures = {},
  imageUploadConfig = {},
  readOnly = false,
  autoFocus = false,
  initialConfig = {},
}) {
  const resolvedImageFeatures = resolveImageFeatures(enableImage, imageFeatures);
  const canInsertImage =
    resolvedImageFeatures.upload ||
    resolvedImageFeatures.url ||
    resolvedImageFeatures.dragDrop ||
    resolvedImageFeatures.paste;

  const resolvedImageUploadConfig = {
    entityId: imageUploadConfig?.entityId || "",
    imageTarget: imageUploadConfig?.imageTarget || "",
    uploadHandler:
      typeof imageUploadConfig?.uploadHandler === "function"
        ? imageUploadConfig.uploadHandler
        : null,
    deleteHandler:
      typeof imageUploadConfig?.deleteHandler === "function"
        ? imageUploadConfig.deleteHandler
        : null,
  };

  const config = {
    namespace: "RichTextEditor",
    theme,
    onError,
    editable: !readOnly,
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      LinkNode,
      AutoLinkNode,
      ImageNode,
    ],
    ...initialConfig,
  };

  return (
    <LexicalComposer initialConfig={config}>
      <div className="rte-wrapper">
        {!readOnly && (
          <ToolbarPlugin
            enableImage={enableImage}
            imageFeatures={resolvedImageFeatures}
            imageUploadConfig={resolvedImageUploadConfig}
          />
        )}
        <div className="rte-editor-area">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="rte-content-editable" />
            }
            placeholder={<div className="rte-placeholder">{placeholder}</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <ImagePlugin
            enableImage={enableImage}
            canInsertImage={canInsertImage}
            imageFeatures={resolvedImageFeatures}
            imageUploadConfig={resolvedImageUploadConfig}
          />
          <InitialHtmlPlugin initialHtml={initialHtml} />
          {autoFocus && <AutoFocusPlugin />}
          {(onChange || onHtmlChange) && (
            <OnChangePlugin
              onChange={(editorState, editor) => {
                if (onChange) onChange(editorState, editor);
                if (onHtmlChange) {
                  editorState.read(() => {
                    const html = String($generateHtmlFromNodes(editor, null) ?? "");
                    onHtmlChange(normalizeRichTextHtml(html));
                  });
                }
              }}
            />
          )}
        </div>
      </div>
    </LexicalComposer>
  );
}
