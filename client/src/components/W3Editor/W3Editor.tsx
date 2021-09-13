import { debounce } from 'lodash';
import 'quill/dist/quill.bubble.css';
import Quill, { QuillOptionsStatic } from 'quill';
import React, { useEffect, useState } from 'react';
import { HLJS_LANGUAGES } from '@/src/lib/constants';
import { Editor } from './W3Editor.styled';

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

interface Props {
  content: string;
  setContent?: (content: string) => void;
}

export default function W3Editor({ content, setContent }: Props) {
  const [editor, setEditor] = useState<Quill>();

  useEffect(() => {
    const quill = new Quill('#w3-editor', quillOptions);

    quill.on(
      'text-change',
      debounce(() => {
        const html = quill.root.innerHTML;
        setContent && setContent(html);
      }, 500)
    );

    setEditor(quill);
  }, [setContent]);

  return <Editor id="w3-editor">{content}</Editor>;
}
