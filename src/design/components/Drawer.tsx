'use client';
import {
  DrawerBody,
  Drawer as DrawerCk,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { FiDownload, FiUpload } from 'react-icons/fi';

import { useUserData } from '~/business/hooks';

import FileUpload from './FileUpload';
import List from './List';
import ListItem from './ListItem';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const { exportUserData, importUserData } = useUserData();
  const router = useRouter();
  const toast = useToast();

  const handleFileUpload = async (file: File) => {
    try {
      await importUserData(file);

      toast({
        title: 'configs imported successfully!',
      });
    } catch (e) {
      toast({
        title:
          'We were unable to import your configs, verify the file and try again!',
        status: 'warning',
      });
    } finally {
      onClose();
    }
  };

  const navigateTo = (route: string) => () => router.push(route);
  return (
    <DrawerCk isOpen={isOpen} placement='right' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>

        <DrawerBody>
          <List>
            <ListItem
              title='Favorites'
              icon={<FaHeart />}
              spacing={4}
              onClick={navigateTo('/liked')}
            />
            <ListItem title='Import Data' icon={<FiUpload />} spacing={4}>
              <FileUpload
                helperText='Your current favorites movies will be lost!'
                onUpload={handleFileUpload}
                placeholder='Select your file...'
                acceptedFileTypes='application/json'
              />
            </ListItem>
            <ListItem
              onClick={exportUserData}
              title='Export Data'
              icon={<FiDownload />}
              spacing={4}
            />
          </List>
        </DrawerBody>
      </DrawerContent>
    </DrawerCk>
  );
};

export default Drawer;
