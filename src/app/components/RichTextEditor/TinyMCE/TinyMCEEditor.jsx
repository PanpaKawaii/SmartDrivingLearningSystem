import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import { uploadMedia } from '../../../../mocks/CallingAPI';
    

export default function TinyMCEEditor({ value = '', onChange, useImage = true, entityId, imageTarget, action, placeholder }){
  const editorRef = useRef(null);
  const { user } = useAuth?.() || {};
  const token = user?.token || '';

  // TinyMCE images_upload_handler (v6+) signature: (blobInfo, progress) => Promise<string>
  const handleImageUpload = (blobInfo, progress) => new Promise(async (resolve, reject) => {
    try {
      if (!entityId) {
        if (action === 'add') {
          reject('Bạn cần lưu bài học trước khi upload ảnh.');
        } else {
          reject('Không tìm thấy ID bài học.');
        }
        return;
      }
      
      const file = blobInfo.blob();
      const files = [file];
      
      // Lưu ý: Nếu uploadMedia API của bạn hỗ trợ theo dõi tiến độ, 
      // bạn có thể dùng tham số progress() truyền vào từ 1 đến 100.
      const res = await uploadMedia(files, entityId, imageTarget, token);
      
      // res là mảng, lấy url đầu tiên
      if (Array.isArray(res) && res[0]?.url) {
        resolve(res[0].url); // Trả về URL hợp lệ cho TinyMCE
      } else {
        reject('Không nhận được URL ảnh từ server.');
      }
    } catch (err) {
      reject('Lỗi upload ảnh: ' + (err?.message || err));
    }
  });

  const basePlugins = [
    'accordion', 'advlist', 'lists', 'anchor', 'charmap', 'emoticons', 
    'code', 'codesample', 'directionality', 'fullscreen', 'preview', 
    'help', 'insertdatetime', 'nonbreaking', 'pagebreak', 'quickbars', 
    'searchreplace', 'table', 'visualblocks', 'visualchars', 'wordcount'
  ];
  
  // 3 PLUGIN MEDIA
  const mediaPlugins = ['autolink', 'link', 'image'];
  const activePlugins = useImage ? [...basePlugins, ...mediaPlugins] : basePlugins;
  const mediaToolbar = useImage ? 'link image | ' : '';
  
  const activeToolbar = 
    `fullscreen preview | undo redo | blocks fontfamily fontsizeinput forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | searchreplace | ltr rtl | bullist numlist outdent indent | accordion codesample ${mediaToolbar}table emoticons charmap | pagebreak nonbreaking insertdatetime | visualblocks visualchars | removeformat code help`;

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
      onEditorChange={onChange}
    />
  );
}