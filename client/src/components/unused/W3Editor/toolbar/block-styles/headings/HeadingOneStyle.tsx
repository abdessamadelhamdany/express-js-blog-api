import React from 'react';
import Props from '../../interfaces';
import { ToolbarButton } from '../../Toolbar.styled';

export default function HeadingOneStyle({ isActive, onClick }: Props) {
  return (
    <ToolbarButton className={isActive && 'active'} onClick={onClick}>
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z"></path>
      </svg>
    </ToolbarButton>
  );
}
