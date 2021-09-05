import 'draft-js/dist/Draft.css';
import { debounce } from 'lodash';
import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertFromRaw,
  convertToRaw,
  DraftHandleValue,
} from 'draft-js';

import StyleButton from './StyleButton';
import { INLINE_STYLES, BLOCK_TYPES, STYLED_MAP } from './constants';

interface Props {
  initialContent?: string;
  setContent: (content: string) => void;
}

const RichText: FC<Props> = ({ initialContent, setContent }) => {
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

  useEffect(() => {
    if (initialContent) {
      /** Initialize editor state */
      const initialEditorState = EditorState.createWithContent(convertFromRaw(JSON.parse(initialContent)));
      setEditorState(initialEditorState);
    }
  }, [initialContent]);

  const saveContent = debounce((contentState) => {
    // TODO: Save content to server, accept api url
    setContent(JSON.stringify(convertToRaw(contentState)));
  }, 1000);

  const onChange = (newEditorState) => {
    const contentState = editorState.getCurrentContent();
    saveContent(contentState);

    setEditorState(newEditorState);
  };

  const BlockStyleControls = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

    return (
      <div className="RichEditor-controls">
        {BLOCK_TYPES.map((type) => (
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  };

  const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
      <div className="RichEditor-controls">
        {INLINE_STYLES.map((type) => (
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  };

  const toggleBlockType = (blockType) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  let className = 'RichEditor-editor';
  const contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' RichEditor-hidePlaceholder';
    }
  }

  const handleKeyCommand = (command: string): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    console.log(command);

    // if (newState) {
    //   onChange(newState);
    //   return true;
    // }
    // return false;
    return newState;
  };

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }

      return;
    }
    return getDefaultKeyBinding(e);
  };

  function getBlockStyle(block) {
    console.log(block.getType());

    switch (block.getType()) {
      case 'blockquote':
        return 'RichEditor-blockquote';
      default:
        return null;
    }
  }

  return (
    <div className="RichEditor-root">
      <BlockStyleControls editorState={editorState} onToggle={toggleBlockType} />
      <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle} />

      <div className={className} onClick={() => editorRef.current.focus()}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={STYLED_MAP}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={onChange}
          placeholder="Write something educative!"
          ref={editorRef}
          spellCheck={true}
        />
      </div>
    </div>
  );
};

export default RichText;
