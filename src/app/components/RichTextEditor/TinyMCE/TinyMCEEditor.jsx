import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
const apiTinyMCE = import.meta.env.VITE_REACT_TinyMCE_API;
export default function TinyMCEEditor({ initialValue = '', onChange }) {
  const editorRef = useRef(null);

  return (
    <Editor
      apiKey={apiTinyMCE} 
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={initialValue}
      init={{
        height: 400,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor'
        ],
        toolbar:
          'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | removeformat | charmap preview',
        image_title: true,
        automatic_uploads: true,
        file_picker_types: 'image',
        image_caption: true,
        image_dimensions: true, 
      }}
      onEditorChange={onChange}
    />
  );
}