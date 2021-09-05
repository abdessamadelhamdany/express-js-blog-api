import React from 'react';
import Props from '../../interfaces';
import { ToolbarButton } from '../../Toolbar.styled';

export default function HeadingFourStyle({ isActive, onClick }: Props) {
  return (
    <ToolbarButton className={isActive && 'active'} onClick={onClick}>
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm10-2h-1v2h-2v-2h-5v-2l4-6h3v6h1v2zm-3-2V7l-2.8 4H16z"></path>
      </svg>
    </ToolbarButton>
  );
}
