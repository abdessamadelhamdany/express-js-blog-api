export default interface Props {
  isActive?: boolean;
  onClick?: () => void;
}

export enum InlineStyles {
  'Bold' = 'BOLD',
  'Italic' = 'ITALIC',
  'Underline' = 'UNDERLINE',
  'Monospace' = 'CODE',
}

export enum BlockTypes {
  'Unstyled' = 'unstyled',
  'P' = 'paragraph',
  'H1' = 'header-one',
  'H2' = 'header-two',
  'H3' = 'header-three',
  'H4' = 'header-four',
  'H5' = 'header-five',
  'H6' = 'header-six',
  'UL' = 'unordered-list-item',
  'OL' = 'ordered-list-item',
  'Blockquote' = 'blockquote',
  'Code Block' = 'code-block',
  'Atomic' = 'atomic',
}
