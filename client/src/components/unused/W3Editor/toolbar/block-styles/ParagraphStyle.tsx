import React from 'react';
import Props from '../interfaces';
import { ToolbarButton } from '../Toolbar.styled';

export default function ParagraphStyle({ isActive, onClick }: Props) {
  return (
    <ToolbarButton className={isActive && 'active'} onClick={onClick}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.3 4H9.9v-.1l-.9.2c-2.3.4-4 2.4-4 4.8s1.7 4.4 4 4.8l.7.1V20h1.5V5.5h2.9V20h1.5V5.5h2.7V4z" />
      </svg>
    </ToolbarButton>
  );
}
