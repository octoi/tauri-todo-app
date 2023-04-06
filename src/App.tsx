import React from 'react';
import { Container, Heading, Flex, IconButton } from '@chakra-ui/react';
import { IoAddOutline } from 'react-icons/io5';
import { AddTodoWrapper } from './components/addTodoWrapper';

const App: React.FC = () => {
  return (
    <Container maxW='container.md' py={10}>
      <Flex alignItems='center' justifyContent='space-between'>
        <Heading fontSize='2xl'>Todo App</Heading>
        <AddTodoWrapper>
          <IconButton
            aria-label='Add todo'
            icon={<IoAddOutline className='text-xl' />}
            className='bg-gradient-to-br from-app-accent1 to-app-accent3 transition-all duration-200 hover:opacity-80 rounded-lg  '
          />
        </AddTodoWrapper>
      </Flex>
    </Container>
  );
};

export default App;
