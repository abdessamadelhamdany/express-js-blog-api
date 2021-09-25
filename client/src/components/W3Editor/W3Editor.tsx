import 'quill/dist/quill.snow.css';
import { debounce } from 'lodash';
import React, { useEffect, useRef } from 'react';
import Quill, { QuillOptionsStatic } from 'quill';
import { Editor, EditorToolbar, EditorWrapper } from './W3Editor.styled';
import { randomQuote } from '@/src/lib/quotes';
import { HLJS_LANGUAGES } from '@/src/lib/constants';

const imageHandler = (e: any) => {
  console.log('imageHandler', e);
};

const linkHandler = (e: any) => {
  console.log('linkHandler', e);
};

const quillOptions: QuillOptionsStatic = {
  theme: 'snow',
  modules: {
    syntax: true,
    toolbar: {
      container: '#w3editor-toolbar',
      handlers: {
        link: linkHandler,
        image: imageHandler,
      },
    },
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

  return (
    <EditorWrapper>
      <EditorToolbar id="w3editor-toolbar">
        <span className="ql-formats">
          <button className="ql-bold"></button>
          <button className="ql-italic"></button>
          <button className="ql-code"></button>
        </span>

        <span className="ql-formats">
          <select className="ql-header" defaultValue="0">
            <option value="0"></option>
            <option value="3"></option>
            <option value="2"></option>
            <option value="1"></option>
          </select>
          <button className="ql-blockquote"></button>
          <button className="ql-code-block"></button>
        </span>

        <span className="ql-formats">
          <button className="ql-list" value="ordered"></button>
          <button className="ql-list" value="bullet"></button>
          <select className="ql-align"></select>
        </span>

        <span className="ql-formats">
          <button className="ql-link"></button>
          <button className="ql-image"></button>
          <button className="ql-video"></button>
        </span>
      </EditorToolbar>

      <Editor ref={ref}></Editor>
    </EditorWrapper>
  );
}
