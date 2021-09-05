import { debounce } from 'lodash';
import React, { FC, useState, useEffect, useRef } from 'react';
import { Editor, EditorState, convertFromRaw, convertToRaw, DraftHandleValue, RichUtils } from 'draft-js';
import { BlockTypes, InlineStyles } from './toolbar/interfaces';
import {
  EditorToolbarWrapper,
  EditorToolbar,
  EditorWrapper,
  ToolbarSeparator,
  W3EditorWrapper,
  TitleInput,
} from './W3Editor.styled';
import { BoldStyle, ItalicStyle, CodeStyle } from './toolbar/inline-styles';
import {
  AlignCenterStyle,
  AlignLeftStyle,
  AlignRightStyle,
  BlockquoteStyle,
  CodeBlockStyle,
  HeadingFiveStyle,
  HeadingFourStyle,
  HeadingOneStyle,
  HeadingSixStyle,
  HeadingThreeStyle,
  HeadingTwoStyle,
  OrderedListStyle,
  ParagraphStyle,
  UnorderedListStyle,
} from './toolbar/block-styles';

interface Props {
  title: string;
  setTitle: (title: string) => void;
  initialContent?: string;
  setContent: (content: string) => void;
}

const W3Editor: FC<Props> = ({ initialContent, setContent, title, setTitle }) => {
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

  const handleKeyCommand = (command: string, latestState: EditorState): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(latestState, command);

    console.log(command, newState, latestState);

    if (newState) {
      onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const onChange = (newEditorState) => {
    const currentContentState = editorState.getCurrentContent();
    const newContentState = newEditorState.getCurrentContent();

    if (currentContentState !== newContentState) {
      saveContent(newContentState);
    } else {
      const selectionState = newEditorState.getSelection();
      console.log(newEditorState);

      console.log('select', selectionState.getStartOffset(), selectionState.getEndOffset());
    }

    setEditorState(newEditorState);
  };

  const toggleInlineStyle = (inlineStyle: InlineStyles) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const toggleBlockType = (blockType: BlockTypes) => {
    console.log('toggleBlockType', blockType);

    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <W3EditorWrapper>
      <EditorToolbarWrapper>
        <EditorToolbar>
          <ParagraphStyle isActive={false} onClick={() => toggleBlockType(BlockTypes.P)} />
          <HeadingOneStyle isActive={false} onClick={() => toggleBlockType(BlockTypes.H1)} />
          <HeadingTwoStyle isActive={false} onClick={() => toggleBlockType(BlockTypes.H2)} />
          <HeadingThreeStyle isActive={false} onClick={() => toggleBlockType(BlockTypes.H3)} />
          <HeadingFourStyle isActive={false} onClick={() => toggleBlockType(BlockTypes.H4)} />
          <HeadingFiveStyle isActive={false} onClick={() => toggleBlockType(BlockTypes.H5)} />
          <HeadingSixStyle isActive={false} onClick={() => toggleBlockType(BlockTypes.H6)} />

          <ToolbarSeparator />

          <BoldStyle isActive={true} onClick={() => toggleInlineStyle(InlineStyles.Bold)} />
          <ItalicStyle isActive={false} onClick={() => toggleInlineStyle(InlineStyles.Italic)} />
          <CodeStyle isActive={false} onClick={() => toggleInlineStyle(InlineStyles.Monospace)} />

          <ToolbarSeparator />

          <AlignLeftStyle isActive={false} />
          <AlignCenterStyle isActive={false} />
          <AlignRightStyle isActive={false} />

          <ToolbarSeparator />

          <BlockquoteStyle isActive={false} />
          <UnorderedListStyle isActive={false} />
          <OrderedListStyle isActive={false} />
          <CodeBlockStyle isActive={false} />
        </EditorToolbar>
      </EditorToolbarWrapper>

      <TitleInput
        value={title}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            editorRef.current.focus();
          }
        }}
        onChange={({ target: { value: newTitle } }) => setTitle(newTitle)}
      />

      <EditorWrapper onClick={() => editorRef.current.focus()}>
        <Editor
          ref={editorRef}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
          placeholder="Write something educative!"
        />
      </EditorWrapper>
    </W3EditorWrapper>
  );
};

export default W3Editor;
