import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/src/hooks';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { fadeVariants } from '@/src/lib/motions';
import { UserCircleIcon, LogoutIcon } from '@heroicons/react/outline';
import {
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownMenuDevider,
  DropdownMenuItem,
  DropdownMenuItemContent,
  Wrapper,
} from './AccountDropdown.styled';

type Props = {
  avatar: string; // ToDo: Setup redux store (or any state management) for logged in user
};

export default function AccountDropdown({ avatar }: Props) {
  const router = useRouter();
  const { setAuthUser } = useAuth();
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
            <Link href="/dashboard" passHref>
              <DropdownMenuItem>
                <DropdownMenuItemContent>
                  <UserCircleIcon />
                  <span>Profile</span>
                </DropdownMenuItemContent>
              </DropdownMenuItem>
            </Link>

            <DropdownMenuDevider />

            <DropdownMenuItem
              href="#"
              onClick={(event) => {
                event.preventDefault();
                axios
                  .post('/api/logout')
                  .then((_: AxiosResponse) => {
                    router.push('/');
                    setAuthUser(null);
                  })
                  .catch((_: AxiosError) => {
                    console.error('Sorry something went wrong!');
                  });
              }}
            >
              <DropdownMenuItemContent>
                <LogoutIcon />
                <span>Logout</span>
              </DropdownMenuItemContent>
            </DropdownMenuItem>
          </DropdownMenu>
        </Dropdown>
      </motion.div>
    </Wrapper>
  );
}
