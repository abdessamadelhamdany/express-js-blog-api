import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import { debounce } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { randomQuote } from '@/src/lib/quotes';
import { HLJS_LANGUAGES } from '@/src/lib/constants';
import { useMediaLibrary } from '@/src/hooks/contexts/useMediaLibrary';
import { Editor, EditorToolbar, EditorWrapper } from './W3Editor.styled';

let quill: Quill;

window.hljs.configure({
  languages: HLJS_LANGUAGES,
});

interface Props {
  content: string;
  placeholder?: string;
  setContent?: (content: string) => void;
}

export default function W3Editor({ content, placeholder, setContent }: Props) {
  const editorRef = useRef(null);
  const toolbarRef = useRef(null);
  const { setIsMediaLibraryModalOpen, insertedImage, setInsertedImage } = useMediaLibrary();

  useEffect(() => {
    quill = new Quill(editorRef.current || '', {
      theme: 'snow',
      modules: {
        syntax: true,
        toolbar: {
          container: toolbarRef.current,
          handlers: {
            link(e: any) {
              console.log('linkHandler', e);
            },
            image() {
              setIsMediaLibraryModalOpen(true);
            },
          },
        },
      },
      placeholder: placeholder ?? randomQuote(),
    });

    /** Initialize editor content */
    quill.clipboard.dangerouslyPasteHTML(0, content);

    /** Syncronize editor content state */
    quill.on(
      'text-change',
      debounce(() => {
        const html = quill.root.innerHTML;
        setContent && setContent(html);
      }, 500)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof insertedImage !== 'undefined') {
      const range = quill.getSelection();
      quill.insertEmbed(range.index, 'image', `/${insertedImage}`);
      quill.setSelection(range.index + 1, 0);

      setInsertedImage(undefined);
    }
  }, [insertedImage, setInsertedImage]);

  return (
    <>
      <EditorWrapper>
        <EditorToolbar ref={toolbarRef}>
          <span className="ql-formats">
            <button className="ql-bold"></button>
            <button className="ql-italic"></button>
            <button className="ql-code"></button>
          </span>

          <span className="ql-formats">
            <select className="ql-header" defaultValue="0">
              <option value="0">P</option>
              <option value="4">H4</option>
              <option value="3">H3</option>
              <option value="2">H2</option>
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

          <span className="ql-formats">
            <button className="ql-script" value="sub"></button>
            <button className="ql-script" value="super"></button>
          </span>
        </EditorToolbar>

        <Editor ref={editorRef} onClick={() => quill.focus()}></Editor>
      </EditorWrapper>
    </>
  );
}
