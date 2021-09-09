// import { debounce } from 'lodash';
import React, { useEffect } from 'react';

interface Props {
  content: string;
  setContent?: (content: string) => void;
}

export default function W3Editor({ content, setContent }: Props) {
  return <div id="w3-editor">{content}</div>;
}
