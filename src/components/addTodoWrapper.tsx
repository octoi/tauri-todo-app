import moment from 'moment';
import * as api from '../utils/todo.api';
import { useEffect, useState } from 'react';
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
  useToast,
} from '@chakra-ui/react';

export const AddTodoWrapper: ReactComponent = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = useState('');
  const [assignedAt, setAssignedAt] = useState('');
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleAddTodo = () => {
    if (!title) return;

    setLoading(true);

    api
      .addTodo(title, moment(assignedAt).valueOf())
      .then(() => {
        toast({
          title: 'Added to successfully',
          duration: 3000,
          isClosable: true,
          status: 'success',
          position: 'top-right',
        });

        onClose();
      })
      .catch((err) => {
        toast({
          title: err,
          duration: 3000,
          isClosable: true,
          status: 'error',
          position: 'top-right',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    return () => {
      setTitle('');
      setAssignedAt('');
      setLoading(false);
    };
  }, []);

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent className='bg-app-dark1'>
          <ModalHeader>Add Todo</ModalHeader>
          <ModalCloseButton disabled={loading} />
          <ModalBody>
            <Input
              variant='filled'
              placeholder='I want to code'
              className='bg-app-dark2'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
            <Input
              mt={3}
              variant='filled'
              type='datetime-local'
              value={assignedAt}
              onChange={(e) => {
                setAssignedAt(e.target.value);
              }}
              className='bg-app-dark2'
              disabled={loading}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              mr={2}
              onClick={onClose}
              className='bg-app-dark2 transition-all duration-200 hover:opacity-70'
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              className={`bg-app-accent1 transition-all duration-200 ${
                title.trim().length != 0
                  ? 'hover:opacity-80'
                  : 'opacity-50 hover:opacity-50 cursor-not-allowed'
              }`}
              disabled={title.trim().length == 0}
              isLoading={loading}
              onClick={handleAddTodo}
            >
              Add todo
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
