import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import { uploadMedia, deleteMedia } from '../../../../mocks/CallingAPI';
    

export default function TinyMCEEditor({ value = '', onChange, useImage = true, entityId, imageTarget, action, placeholder }){
  const editorRef = useRef(null);
  const prevContentRef = useRef(value);
  const { user } = useAuth?.() || {};
  const token = user?.token || '';

  const handleImageUpload = (blobInfo, progress) => new Promise(async (resolve, reject) => {
    try {
      if (!entityId) {
        if (action === 'add') {
          reject('Bạn cần lưu bài học trước khi upload ảnh.');
        } else if (action === 'edit') {
          reject('Không tìm thấy ID bài học.');
        } else {
          reject('Không thể upload ảnh.');
        }
        return;
      }
      
      const file = blobInfo.blob();
      const files = [file];
      
      const res = await uploadMedia(files, entityId, imageTarget, token);
      console.log('Upload response:', res);
      if (Array.isArray(res) && res[0]?.url) {
        resolve(res[0].url); 
      } else {
        reject('Không nhận được URL ảnh từ server.');
      }
    } catch (err) {
      reject('Lỗi upload ảnh: ' + (err?.message || err));
    }
  });

  const basePlugins = [
    'accordion', 'advlist', 'lists', 'anchor', 'charmap', 'emoticons', 
    'code', 'codesample', 'directionality', 'fullscreen',
    'help', 'insertdatetime', 'nonbreaking', 'pagebreak', 'quickbars', 
    'searchreplace', 'table', 'visualblocks', 'visualchars', 'wordcount'
  ];
  
  const mediaPlugins = ['autolink', 'link', 'image'];
  const activePlugins = useImage ? [...basePlugins, ...mediaPlugins] : basePlugins;
  const mediaToolbar = useImage ? 'link image | ' : '';
  
  const activeToolbar = 
    `fullscreen | undo redo | blocks fontfamily fontsizeinput forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | searchreplace | ltr rtl | bullist numlist outdent indent | accordion codesample ${mediaToolbar}table emoticons charmap | pagebreak nonbreaking insertdatetime | visualblocks visualchars | removeformat code help`;

  // lấy url ảnh từ content
  const extractImageUrls = html => {
    if (!html) return [];
    const urls = [];
    const imgRegex = /<img [^>]*src=["']([^"'>]+)["'][^>]*>/g;
    let match;
    while ((match = imgRegex.exec(html))) {
      urls.push(match[1]);
    }
    return urls;
  };

  // Khi content thay đổi, kiểm tra và xóa ảnh thừa
  const handleEditorChange = async (newContent, editor) => {
    if (onChange) onChange(newContent);
    if (!entityId) {
      prevContentRef.current = newContent;
      return;
    }
    try {
      // Lấy danh sách ảnh cũ và mới
      const oldUrls = extractImageUrls(prevContentRef.current);
      const newUrls = extractImageUrls(newContent);
      // xóa những ảnh đã bị xóa khỏi content
      const removed = oldUrls.filter(url => !newUrls.includes(url));
      if (removed.length > 0) {
        for (const url of removed) {
          try { await deleteMedia(url, imageTarget || 'LessonImage', token); } catch (e) { console.error('deleteMedia error', e); }
        }
      }
    } catch (e) { console.error('Error auto-cleanup images:', e); }
    prevContentRef.current = newContent;
  };

  return (
    <Editor
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      onInit={(evt, editor) => (editorRef.current = editor)}
      value={value}
      init={{
        license_key: 'gpl', 
        height: 500,
        menubar: 'file edit view insert format tools table help', 
        placeholder: placeholder,
        plugins: activePlugins,
        toolbar: activeToolbar,
        toolbar_mode: 'sliding', 
        
        link_context_toolbar: true, 
        quickbars_selection_toolbar: 'bold italic underline | forecolor backcolor quicklink',  
        quickbars_insert_toolbar: 'blocks blockquote hr table', 

        image_title: true,
        automatic_uploads: true,
        file_picker_types: 'image',
        image_caption: true,
        image_dimensions: true, 
        images_upload_handler: handleImageUpload
        
      }}
      onEditorChange={handleEditorChange}
    />
  );
}