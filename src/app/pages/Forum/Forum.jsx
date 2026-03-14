import React, { useState } from "react";
import PopupContainer from "../../components/PopupContainer/PopupContainer";
import ForumCard from "./ForumCard";
import ForumPopup from "./ForumPopup";

import "./Forum.css";

//TEST DEMO RICH TEXT EDITOR
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
//TEST DEMO RICH TEXT EDITOR

export default function Forum() {
  const [FORUMPOSTs, setFORUMPOSTs] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  //TEST DEMO RICH TEXT EDITOR
  const [htmlContent, setHtmlContent] = useState("");
  //TEST DEMO RICH TEXT EDITOR

  const ListPost = [
    {
      id: 1,
      title: "Forum 1",
      content: "Content 1",
    },
    {
      id: 2,
      title: "Forum 2",
      content: "Content 2",
    },
  ];

  //TEST DEMO RICH TEXT EDITOR
  const handleHtmlChange = (value) => {
    // Chỉ nhận string HTML, còn lại set rỗng
    setHtmlContent(typeof value === "string" ? value : "");
  };

  const getContent = () => {
    if (typeof htmlContent !== "string") return null;
    const html = htmlContent.trim();
    return html ? html : null;
  };
  //TEST DEMO RICH TEXT EDITOR

  return (
    <div className="forum-container">
      <div className="left"></div>
      <div className="center">
        <div className="list">
          {ListPost.map((post, i) => (
            <React.Fragment key={i}>
              <ForumCard post={post} setSelectedPost={setSelectedPost} />
            </React.Fragment>
          ))}
        </div>
        {/* TEST DEMO RICH TEXT EDITOR */}
        <RichTextEditor
          initialHtml='<h2>Tiêu đề</h2><ul><li value="1">chấm</li></ul><p><br></p><ol><li value="1">số</li></ol><p><br></p><h1><strong>IN ĐÂM</strong></h1>' //test prefill
          onHtmlChange={handleHtmlChange}
          placeholder="Viết bình luận của bạn..."
          autoFocus
        />
        <button
          onClick={() =>
            console.log(
              "Editor content:",
              getContent(),
            )
          }
        >
          {" "}
          Log Content{" "}
        </button>
        {/* TEST DEMO RICH TEXT EDITOR */}
      </div>
      <div className="right"></div>

      {selectedPost && (
        <PopupContainer onClose={setSelectedPost}>
          <div className="inner-popup">
            <ForumCard post={selectedPost} setSelectedPost={setSelectedPost} />
            <ForumPopup SelectedPost={selectedPost} />
          </div>
        </PopupContainer>
      )}
    </div>
  );
}
