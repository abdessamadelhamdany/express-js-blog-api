import { debounce } from 'lodash';
import 'quill/dist/quill.bubble.css';
import React, { useEffect, useRef } from 'react';
import Quill, { QuillOptionsStatic } from 'quill';
import { Editor } from './W3Editor.styled';
import { randomQuote } from '@/src/lib/quotes';
import { HLJS_LANGUAGES } from '@/src/lib/constants';

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
  const ref = useRef(null);

  useEffect(() => {
    if (placeholder) {
      quillOptions.placeholder = placeholder;
    }

    const quill = new Quill(ref.current || '', quillOptions);
    quill.clipboard.dangerouslyPasteHTML(0, content);

    quill.on(
      'text-change',
      debounce(() => {
        const html = quill.root.innerHTML;
        setContent && setContent(html);
      }, 500)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Editor ref={ref} />;
}
