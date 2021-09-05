import React from 'react';
import Props from '../../interfaces';
import { ToolbarButton } from '../../Toolbar.styled';

export default function AlignLeftStyle({ isActive }: Props) {
  return (
    <ToolbarButton className={isActive && 'active'}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 19.8h8.9v-1.5H4v1.5zm8.9-15.6H4v1.5h8.9V4.2zm-8.9 7v1.5h16v-1.5H4z"></path>
      </svg>
    </ToolbarButton>
  );
}
