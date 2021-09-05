import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { fadeVariants } from '@/src/lib/motions';
import { UserCircleIcon, CogIcon } from '@heroicons/react/outline';
import {
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuItemContent,
  Wrapper,
} from './AccountDropdown.styled';

type Props = {
  avatar: string; // ToDo: Setup redux store (or any state management) for logged in user
};

export default function AccountDropdown({ avatar }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hideDropdown = () => setIsOpen(false);

    window.addEventListener('click', hideDropdown);

    return () => window.removeEventListener('click', hideDropdown);
  }, []);

  return (
    <Wrapper
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Avatar onClick={() => setIsOpen(!isOpen)}>
        <Image src={avatar} alt="" height={98} width={98} />
      </Avatar>

      <motion.div
        initial={{ display: 'none' }}
        animate={isOpen ? fadeVariants.visible : fadeVariants.hidden}
        transition={{ duration: 0.2 }}
      >
        <Dropdown>
          <DropdownMenu>
            <Link href="/" passHref>
              <DropdownMenuItem>
                <DropdownMenuItemContent>
                  <UserCircleIcon />
                  <span>Profile</span>
                </DropdownMenuItemContent>
              </DropdownMenuItem>
            </Link>

            <Link href="/" passHref>
              <DropdownMenuItem>
                <DropdownMenuItemContent>
                  <CogIcon />
                  <span>Preferences</span>
                </DropdownMenuItemContent>
              </DropdownMenuItem>
            </Link>
          </DropdownMenu>
        </Dropdown>
      </motion.div>
    </Wrapper>
  );
}
