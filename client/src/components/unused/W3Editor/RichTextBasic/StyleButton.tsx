import React from 'react';

interface Props {
  label: string;
  style: string;
  active: boolean;
  onToggle: (style: string) => void;
}

export default function StyledButton({ label, style, active, onToggle }) {
  const handleMouseDown = (e) => {
    e.preventDefault();
    onToggle(style);
  };

  let className = 'RichEditor-styleButton';

  if (active) {
    className += ' RichEditor-activeButton';
  }

  return (
    <span className={className} onMouseDown={handleMouseDown}>
      {label}
    </span>
  );
}
