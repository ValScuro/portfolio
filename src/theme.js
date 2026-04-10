import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode('gray.50', 'gray.900')(props),
      color: mode('gray.800', 'whiteAlpha.900')(props),
      transition: 'background-color 0.2s ease-in-out',
    },
  }),
};

const colors = {
  brand: {
    50: '#e0f7fa',
    100: '#b2ebf2',
    200: '#80deea',
    300: '#4dd0e1',
    400: '#26c6da',
    500: '#00bcd4',
    600: '#00acc1',
    700: '#0097a7',
    800: '#00838f',
    900: '#006064',
  },
  accent: {
    50: '#fff8e1',
    100: '#ffecb3',
    200: '#ffe082',
    300: '#ffd54f',
    400: '#ffca28',
    500: '#ffc107',
    600: '#ffb300',
    700: '#ffa000',
    800: '#ff8f00',
    900: '#ff6f00',
  },
};

const fonts = {
  heading: 'Poppins, sans-serif',
  body: 'Inter, sans-serif',
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'bold',
      borderRadius: 'md',
      _hover: {
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      },
      _active: {
        transform: 'translateY(0)',
      },
      transition: 'all 0.2s ease-in-out',
    },
    variants: {
      solid: (props) => ({
        bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.600',
        color: 'white',
        _hover: {
          bg: props.colorMode === 'dark' ? 'brand.400' : 'brand.700',
        },
      }),
      outline: (props) => ({
        borderColor: props.colorMode === 'dark' ? 'brand.500' : 'brand.600',
        color: props.colorMode === 'dark' ? 'brand.500' : 'brand.600',
        _hover: {
          bg: props.colorMode === 'dark' ? 'rgba(0, 188, 212, 0.1)' : 'rgba(0, 172, 193, 0.1)',
        },
      }),
    },
  },
  Link: {
    baseStyle: (props) => ({
      color: props.colorMode === 'dark' ? 'brand.300' : 'brand.700',
      _hover: {
        textDecoration: 'none',
        color: props.colorMode === 'dark' ? 'brand.200' : 'brand.800',
      },
      transition: 'color 0.2s ease-in-out',
    }),
  },
  Heading: {
    baseStyle: {
      fontWeight: '600',
    },
  },
};

const theme = extendTheme({
  config,
  styles,
  colors,
  fonts,
  components,
});

export default theme;