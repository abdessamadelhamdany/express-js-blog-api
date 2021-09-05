import React from 'react';
import Props from '../interfaces';
import { ToolbarButton } from '../Toolbar.styled';

export default function BlockquoteStyle({ isActive }: Props) {
  return (
    <ToolbarButton className={isActive && 'active'}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 6v6h5.2v4c0 .8-.2 1.4-.5 1.7-.6.6-1.6.6-2.5.5h-.3v1.5h.5c1 0 2.3-.1 3.3-1 .6-.6 1-1.6 1-2.8V6H13zm-9 6h5.2v4c0 .8-.2 1.4-.5 1.7-.6.6-1.6.6-2.5.5h-.3v1.5h.5c1 0 2.3-.1 3.3-1 .6-.6 1-1.6 1-2.8V6H4v6z" />
      </svg>
    </ToolbarButton>
  );
}
