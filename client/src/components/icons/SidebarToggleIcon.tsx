import { FC } from 'react';

interface Props {
  isActive?: boolean;
}

const SidebarToggleIcon: FC<Props> = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 2.5h11.5v19H3a.5.5 0 01-.5-.5V3a.5.5 0 01.5-.5z" stroke="currentColor" />
      <path d="M15.5 2.5H21a.5.5 0 01.5.5v18a.5.5 0 01-.5.5h-5.5v-19z" fill="transparent" stroke="currentColor" />
    </svg>
  );
};

export default SidebarToggleIcon;
