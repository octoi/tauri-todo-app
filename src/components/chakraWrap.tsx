import { useEffect } from 'react';
import {
  ChakraProvider,
  extendTheme,
  ThemeConfig,
  DarkMode,
  useColorMode,
} from '@chakra-ui/react';
import { ReactComponent } from '../utils/react.type';

const config: ThemeConfig = {
  initialColorMode: 'dark',
};

const theme = extendTheme({ config });

export const ChakraWrap: ReactComponent = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <ChakraDarkMode>{children}</ChakraDarkMode>
    </ChakraProvider>
  );
};

const ChakraDarkMode: ReactComponent = ({ children }) => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode('dark'); // setting color mode to dark, just in case
  }, []);

  return <DarkMode>{children}</DarkMode>;
};
