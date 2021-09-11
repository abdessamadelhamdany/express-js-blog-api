import 'quill/dist/quill.bubble.css';
import Quill, { QuillOptionsStatic } from 'quill';
import React, { useEffect, useState } from 'react';
import { HLJS_LANGUAGES } from '@/src/lib/constants';
import { Editor } from './W3Editor.styled';

interface Props {
  content: string;
  setContent?: (content: string) => void;
}

var quillOptions: QuillOptionsStatic = {
  theme: 'bubble',
  modules: {
    syntax: true,
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['link', 'image'],
      [{ header: 1 }, { header: 2 }],
      ['blockquote', 'code-block'],
    ],
  },
  placeholder: 'Compose an epic...',
};

window.hljs.configure({
  languages: HLJS_LANGUAGES,
});

export default function W3Editor({ content, setContent }: Props) {
  const [editor, setEditor] = useState<Quill>();

  useEffect(() => {
    const quill = new Quill('#w3-editor', quillOptions);

    setEditor(quill);
  }, []);

  return <Editor id="w3-editor">Editor</Editor>;
}
