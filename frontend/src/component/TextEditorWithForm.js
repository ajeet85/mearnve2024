import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { apiKey, editorConfig } from '../tinymceConfig';


export default function TextEditorWithForm() {
  return (
    <div>
       <Editor
        apiKey={apiKey}
        init={editorConfig}
        initialValue="First Editor"
      />

      <Editor
        apiKey={apiKey}
        init={editorConfig}
        initialValue="Second editor"
      />

    </div>
  )
}
