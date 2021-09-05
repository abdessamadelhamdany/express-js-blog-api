import React from 'react';
import Props from '../interfaces';
import { ToolbarButton } from '../Toolbar.styled';

export default function ItalicStyle({ isActive, onClick }: Props) {
  return (
    <ToolbarButton className={isActive && 'active'} onClick={onClick}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 5L10 19h1.9l2.5-14z" />
      </svg>
    </ToolbarButton>
  );
}
