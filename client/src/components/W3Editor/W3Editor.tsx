import { debounce } from 'lodash';
import 'quill/dist/quill.bubble.css';
import Quill, { QuillOptionsStatic } from 'quill';
import React, { useEffect, useState } from 'react';
import { HLJS_LANGUAGES } from '@/src/lib/constants';
import { Editor } from './W3Editor.styled';
import { randomQuote } from '@/src/lib/quotes';

var quillOptions: QuillOptionsStatic = {
  theme: 'bubble',
  modules: {
    syntax: true,
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['link', 'image'],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['blockquote', 'code-block'],
    ],
  },
  placeholder: randomQuote(),
};

window.hljs.configure({
  languages: HLJS_LANGUAGES,
});

interface Props {
  content: string;
  placeholder?: string;
  setContent?: (content: string) => void;
}

export default function W3Editor({ content, placeholder, setContent }: Props) {
  const [editor, setEditor] = useState<Quill>();

  useEffect(() => {
    if (placeholder) {
      quillOptions.placeholder = placeholder;
    }

    const quill = new Quill('#w3-editor', quillOptions);

    quill.on(
      'text-change',
      debounce(() => {
        const html = quill.root.innerHTML;
        setContent && setContent(html);
      }, 500)
    );

    setEditor(quill);
  }, [setContent, placeholder]);

  return <Editor id="w3-editor" dangerouslySetInnerHTML={{ __html: content }}></Editor>;
}
