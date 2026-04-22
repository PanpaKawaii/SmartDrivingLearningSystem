import { Editor } from '@tinymce/tinymce-react';
import { useRef, forwardRef, useImperativeHandle } from 'react';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import { uploadMedia } from '../../../../mocks/CallingAPI';
    

const TinyMCEEditor = forwardRef(function TinyMCEEditor({ value = '', onChange, useImage = true, entityId, imageTarget, action, placeholder }, ref) {
  const editorRef = useRef(null);
  const { user } = useAuth?.() || {};
  const token = user?.token || '';

  // Expose method: chờ upload xong rồi trả content sạch (URL thay vì blob/base64)
  useImperativeHandle(ref, () => ({
    getCleanContent: async () => {
      const editor = editorRef.current;
      if (!editor) return '';
      await editor.uploadImages();
      return editor.getContent();
    }
  }));

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
      
      const blob = blobInfo.blob();
      // Tạo File đúng chuẩn với filename — blob không có tên sẽ gây lỗi 500 ở BE
      const ext = blob.type?.split('/')[1] || 'png';
      const filename = blobInfo.filename() || `image_${Date.now()}.${ext}`;
      const file = new File([blob], filename, { type: blob.type });

      const res = await uploadMedia([file], entityId, imageTarget, token);
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

  // Sync content vào state (blob/base64 tạm thời được thay bằng URL khi getCleanContent() được gọi trước submit)
  const handleEditorChange = (newContent) => {
    if (onChange) onChange(newContent);
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
});

export default TinyMCEEditor;