import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
  Flex,
  Icon,
  Divider,
  ButtonGroup,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaHeart, FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const accentColor = useColorModeValue('brand.500', 'brand.300');

  // Easter egg - click counter
  const [heartClicks, setHeartClicks] = React.useState(0);

  const handleHeartClick = () => {
    setHeartClicks(prev => prev + 1);

    if (heartClicks === 9) {
      // After 10 clicks (0-9)
      alert('💖 Thanks for the love! You found a hidden message! 💖');

      // Update localStorage to mark this easter egg as found
      const unlockedEggs = JSON.parse(localStorage.getItem('unlockedEasterEggs') || '[]');
      if (!unlockedEggs.includes('heart')) {
        unlockedEggs.push('heart');
        localStorage.setItem('unlockedEasterEggs', JSON.stringify(unlockedEggs));
      }

      setHeartClicks(0);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <Box
      as="footer"
      bg={bgColor}
      color={textColor}
      borderTopWidth={1}
      borderColor={borderColor}
    >
      <Container maxW="container.xl" py={10}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
        >
          <Stack direction="column" spacing={2} mb={{ base: 6, md: 0 }}>
            <Text
              fontSize="lg"
              fontWeight="bold"
              bgGradient={`linear(to-r, ${accentColor}, accent.500)`}
              bgClip="text"
              _hover={{
                bgGradient: "linear(to-r, accent.500, brand.500)",
                transform: "scale(1.05)",
              }}
              transition="all 0.3s ease"
              cursor="default"
            >

            </Text>
            <Text fontSize="sm">
              © {currentYear} Valerie Hewitt. All rights reserved.
            </Text>
            <Flex align="center">
              <Text fontSize="sm" mr={1}>
                Made with
              </Text>
              <Icon
                as={motion.svg}
                color="red.500"
                w={4}
                h={4}
                mx={1}
                onClick={handleHeartClick}
                cursor="pointer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              />
              <Text fontSize="sm" ml={1}>
                and React + Chakra UI
              </Text>
            </Flex>
          </Stack>

          <Stack direction="row" spacing={6}>
            <Stack direction="column" spacing={3} align="flex-start">
              <Text fontWeight="bold" fontSize="sm">
                Navigation
              </Text>
              <Link href="Footer.jsx#home" fontSize="sm" _hover={{ color: accentColor }}>
                Home
              </Link>
              <Link href="Footer.jsx#projects" fontSize="sm" _hover={{ color: accentColor }}>
                Projects
              </Link>
              <Link href="Footer.jsx#skills" fontSize="sm" _hover={{ color: accentColor }}>
                Skills
              </Link>
              <Link href="Footer.jsx#contact" fontSize="sm" _hover={{ color: accentColor }}>
                Contact
              </Link>
            </Stack>

            <Stack direction="column" spacing={3} align="flex-start">
              <Text fontWeight="bold" fontSize="sm">
                Resources
              </Text>
              <Link href="Footer.jsx#" fontSize="sm" _hover={{ color: accentColor }}>
                Resume
              </Link>
              <Link href="Footer.jsx#" fontSize="sm" _hover={{ color: accentColor }}>
                Blog
              </Link>
              <Link href="Footer.jsx#" fontSize="sm" _hover={{ color: accentColor }}>
                Privacy Policy
              </Link>
              <Link href="Footer.jsx#" fontSize="sm" _hover={{ color: accentColor }}>
                Terms of Service
              </Link>
            </Stack>
          </Stack>
        </Flex>

        <Divider my={6} borderColor={borderColor} />

        <Flex
          direction={{ base: 'column', sm: 'row' }}
          align="center"
          justify="space-between"
        >
          <Text fontSize="xs" mb={{ base: 4, sm: 0 }}>
            This site was built with React, Vite, and Chakra UI. Try finding all the easter eggs!
          </Text>

          <ButtonGroup variant="ghost" spacing={3}>
            <Tooltip label="GitHub" placement="top">
              <IconButton
                as="a"
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                icon={<FaGithub />}
                _hover={{
                  bg: useColorModeValue('gray.200', 'gray.700'),
                  color: accentColor,
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.3s ease"
              />
            </Tooltip>
            <Tooltip label="LinkedIn" placement="top">
              <IconButton
                as="a"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                icon={<FaLinkedin />}
                _hover={{
                  bg: useColorModeValue('gray.200', 'gray.700'),
                  color: accentColor,
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.3s ease"
              />
            </Tooltip>
            <Tooltip label="Twitter" placement="top">
              <IconButton
                as="a"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                icon={<FaTwitter />}
                _hover={{
                  bg: useColorModeValue('gray.200', 'gray.700'),
                  color: accentColor,
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.3s ease"
              />
            </Tooltip>
            <Tooltip label="Email" placement="top">
              <IconButton
                as="a"
                href="mailto:your.email@example.com"
                aria-label="Email"
                icon={<FaEnvelope />}
                _hover={{
                  bg: useColorModeValue('gray.200', 'gray.700'),
                  color: accentColor,
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.3s ease"
              />
            </Tooltip>
          </ButtonGroup>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
