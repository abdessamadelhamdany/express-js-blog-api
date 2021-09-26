import 'quill/dist/quill.snow.css';
import { debounce } from 'lodash';
import React, { useEffect, useRef } from 'react';
import Quill, { QuillOptionsStatic } from 'quill';
import { Editor, EditorToolbar, EditorWrapper } from './W3Editor.styled';
import { randomQuote } from '@/src/lib/quotes';
import { HLJS_LANGUAGES } from '@/src/lib/constants';
import { useMediaLibrary } from '@/src/hooks/contexts/useMediaLibrary';

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
  const { isMediaLibraryModalOpen, setIsMediaLibraryModalOpen, mediaFile } = useMediaLibrary();

  useEffect(() => {
    const imageHandler = (e: any) => {
      setIsMediaLibraryModalOpen(true);
      console.log('isMediaLibraryModalOpen', isMediaLibraryModalOpen);

      // const input = document.createElement('input');
      // input.setAttribute('type', 'file');
      // input.setAttribute('accept', 'image/*');
      // input.click();
      // input.onhange = (e: InputEvent) => {
      //   const file = e.target.files[0];
      //   const reader = new window.FileReader();
      //   reader.readAsDataURL(file);
      // reader.addEventListener('load', () => {
      //   let imageUpload = new Upload({
      //     uri: reader.result,
      //     type: file.type,
      //     size: file.size,
      //     fileName: file.name,
      //     source: 'text editor'
      //   })
      //   imageUpload
      //     .save()
      //     .then(data => {
      //       const range = quill.getSelection()
      //       quill.insertEmbed(range.index, 'image', env.siteUrl + '/api/upload/' + data.fileName)
      //     })
      // }, false)
      // };
      // uploaded.then
      // this.insertToEditor(imageUrl);
    };

    const linkHandler = (e: any) => {
      console.log('linkHandler', e);
    };

    const quillOptions: QuillOptionsStatic = {
      theme: 'snow',
      modules: {
        syntax: true,
        toolbar: {
          container: toolbarRef.current,
          handlers: {
            link: linkHandler,
            image: imageHandler,
          },
        },
      },
      placeholder: placeholder ?? randomQuote(),
    };

    const quill = new Quill(editorRef.current || '', quillOptions);
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

          <span className="ql-formats">
            <button className="ql-script" value="sub"></button>
            <button className="ql-script" value="super"></button>
          </span>
        </EditorToolbar>

        <Editor ref={editorRef}></Editor>
      </EditorWrapper>
    </>
  );
}
