import React from 'react';
import Props from '../../interfaces';
import { ToolbarButton } from '../../Toolbar.styled';

export default function AlignCenterStyle({ isActive }: Props) {
  return (
    <ToolbarButton className={isActive && 'active'}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.4 4.2H7.6v1.5h8.9V4.2zM4 11.2v1.5h16v-1.5H4zm3.6 8.6h8.9v-1.5H7.6v1.5z"></path>
      </svg>
    </ToolbarButton>
  );
}
