import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Container,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

const Links = ['Home', 'Projects', 'Skills', 'Contact'];

const NavLink = ({ children, onClick }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('brand.600', 'brand.300');
  
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        color: linkHoverColor,
        transform: 'translateY(-2px)',
      }}
      href={`#${children.toLowerCase()}`}
      color={linkColor}
      fontWeight="medium"
      transition="all 0.2s ease"
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      width="full"
      zIndex="999"
      bg={useColorModeValue(
        scrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
        scrolled ? 'rgba(26, 32, 44, 0.8)' : 'transparent'
      )}
      backdropFilter={scrolled ? 'blur(10px)' : 'none'}
      boxShadow={scrolled ? 'sm' : 'none'}
      transition="all 0.3s ease"
    >
      <Container maxW="container.xl" py={3}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            bgGradient="linear(to-r, brand.500, accent.500)"
            bgClip="text"
            _hover={{
              bgGradient: "linear(to-r, brand.400, accent.400)",
              transform: "scale(1.05)",
            }}
            transition="all 0.3s ease"
            cursor="pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Valerie Hewitt
          </Text>

          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
            <IconButton
              size={'md'}
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              aria-label={'Toggle Color Mode'}
              onClick={toggleColorMode}
              variant="ghost"
              _hover={{
                bg: useColorModeValue('gray.200', 'gray.700'),
                transform: 'rotate(360deg)',
              }}
              transition="all 0.5s ease"
            />
          </HStack>

          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
          />
        </Flex>
      </Container>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="start" mt={4}>
              {Links.map((link) => (
                <NavLink key={link} onClick={onClose}>
                  {link}
                </NavLink>
              ))}
              <Button
                w="full"
                leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="outline"
              >
                {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;