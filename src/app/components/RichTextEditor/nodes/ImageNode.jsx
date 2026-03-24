import { DecoratorNode } from "lexical";

function RichEditorImage({ src, alt, width, height }) {
  return (
    <img
      className="rte-image"
      src={src}
      alt={alt || ""}
      style={{
        maxWidth: width || "100%",
        height: height || "auto",
      }}
    />
  );
}

export class ImageNode extends DecoratorNode {
  __src;
  __alt;
  __width;
  __height;

  static getType() {
    return "image";
  }

  static clone(node) {
    return new ImageNode(
      node.__src,
      node.__alt,
      node.__width,
      node.__height,
      node.__key,
    );
  }

  static importJSON(serializedNode) {
    return $createImageNode({
      src: serializedNode.src,
      alt: serializedNode.alt,
      width: serializedNode.width,
      height: serializedNode.height,
    });
  }

  static importDOM() {
    return {
      img: (domNode) => {
        if (!(domNode instanceof HTMLImageElement)) {
          return null;
        }

        return {
          conversion: () => {
            return {
              node: $createImageNode({
                src: domNode.src,
                alt: domNode.alt,
                width: domNode.style.maxWidth || domNode.getAttribute("width") || "100%",
                height: domNode.style.height || domNode.getAttribute("height") || "auto",
              }),
            };
          },
          priority: 0,
        };
      },
    };
  }

  constructor(src, alt = "", width = "100%", height = "auto", key) {
    super(key);
    this.__src = src;
    this.__alt = alt;
    this.__width = width;
    this.__height = height;
  }

  exportJSON() {
    return {
      type: "image",
      version: 1,
      src: this.__src,
      alt: this.__alt,
      width: this.__width,
      height: this.__height,
    };
  }

  exportDOM() {
    const element = document.createElement("img");
    element.setAttribute("src", this.__src);
    element.setAttribute("alt", this.__alt || "");
    if (this.__width && this.__width !== "auto") {
      element.style.maxWidth = this.__width;
    }
    if (this.__height && this.__height !== "auto") {
      element.style.height = this.__height;
    }

    return { element };
  }

  createDOM() {
    const span = document.createElement("span");
    span.className = "rte-image-node";
    return span;
  }

  updateDOM() {
    return false;
  }

  decorate() {
    return (
      <RichEditorImage
        src={this.__src}
        alt={this.__alt}
        width={this.__width}
        height={this.__height}
      />
    );
  }
}

export function $createImageNode({ src, alt = "", width = "100%", height = "auto" }) {
  return new ImageNode(src, alt, width, height);
}

export function $isImageNode(node) {
  return node instanceof ImageNode;
}