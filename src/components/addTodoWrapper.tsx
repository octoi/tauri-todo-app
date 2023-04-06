import React, { useState } from 'react';
import { ReactComponent } from '../utils/react.type';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
} from '@chakra-ui/react';

export const AddTodoWrapper: ReactComponent = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = useState('');

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent className='bg-app-dark1'>
          <ModalHeader>Add Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              variant='filled'
              placeholder='I want to code'
              className='bg-app-dark2'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              mt={3}
              variant='filled'
              type='date'
              className='bg-app-dark2'
            />
          </ModalBody>

          <ModalFooter>
            <Button
              mr={2}
              onClick={onClose}
              className='bg-app-dark2 transition-all duration-200 hover:opacity-70'
            >
              Cancel
            </Button>
            <Button
              className={`bg-app-accent1 transition-all duration-200 hover:opacity-80 ${
                title.trim().length == 0 &&
                'opacity-50 hover:opacity-50 cursor-not-allowed'
              }`}
              disabled={title.trim().length == 0}
            >
              Add todo
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
