import React, { useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  Flex,
  useColorModeValue,
  Icon,
  useBreakpointValue,
  IconButton
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { ChevronDownIcon } from '@chakra-ui/icons';

// Wrap Chakra components with Framer Motion
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);

// Animation keyframes
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const Hero = () => {
  const bgGradient = useColorModeValue(
    'linear(to-br, white, gray.100, blue.50)',
    'linear(to-br, gray.900, gray.800, blue.900)'
  );

  const textColor = useColorModeValue('gray.700', 'gray.100');
  const accentColor = useColorModeValue('brand.600', 'brand.300');
  const floatAnimation = `${float} 6s ease-in-out infinite`;
  const pulseAnimation = `${pulse} 3s ease-in-out infinite`;

  const heroRef = useRef(null);

  // Scroll down function
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Easter egg - click pattern
  const [clickPattern, setClickPattern] = React.useState([]);
  const secretPattern = [1, 2, 3, 2, 1];

  useEffect(() => {
    if (clickPattern.length === secretPattern.length) {
      if (JSON.stringify(clickPattern) === JSON.stringify(secretPattern)) {
        // Trigger easter egg
        alert('You found a secret! 🎉');

        // Update localStorage to mark this easter egg as found
        const unlockedEggs = JSON.parse(localStorage.getItem('unlockedEasterEggs') || '[]');
        if (!unlockedEggs.includes('pattern')) {
          unlockedEggs.push('pattern');
          localStorage.setItem('unlockedEasterEggs', JSON.stringify(unlockedEggs));
        }
      }
      setClickPattern([]);
    }
  }, [clickPattern]);

  const handleAreaClick = (areaNumber) => {
    setClickPattern([...clickPattern, areaNumber]);
  };

  return (
    <Box
      id="home"
      as="section"
      minH="100vh"
      display="flex"
      alignItems="center"
      bgGradient={bgGradient}
      position="relative"
      overflow="hidden"
      pt="70px"
    >
      {/* Background elements */}
      <MotionBox
        position="absolute"
        top="20%"
        left="10%"
        w="300px"
        h="300px"
        borderRadius="full"
        bg="brand.500"
        filter="blur(80px)"
        opacity="0.2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1 }}
      />

      <MotionBox
        position="absolute"
        bottom="10%"
        right="5%"
        w="250px"
        h="250px"
        borderRadius="full"
        bg="accent.500"
        filter="blur(80px)"
        opacity="0.15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1, delay: 0.3 }}
      />

      <Container maxW="container.xl" zIndex="1">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="space-between"
          pt={{ base: 8, md: 20 }}
          pb={{ base: 16, md: 24 }}
        >
          <MotionFlex
            direction="column"
            w={{ base: '100%', md: '60%' }}
            pr={{ md: 10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MotionText
              color={accentColor}
              fontWeight="bold"
              fontSize="xl"
              mb={3}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Hello, I'm
            </MotionText>

            <Heading
              as="h1"
              size={useBreakpointValue({ base: '2xl', md: '3xl', lg: '4xl' })}
              fontWeight="bold"
              mb={4}
              onClick={() => handleAreaClick(1)}
              cursor="pointer"
            >
              <Text
                as="span"
                position="relative"
                _after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'brand.500',
                  opacity: 0.3,
                  zIndex: -1,
                }}
              >
               Valerie Hewitt
              </Text>
            </Heading>

            <MotionText
              fontSize={{ base: 'xl', md: '2xl' }}
              color={textColor}
              mb={6}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onClick={() => handleAreaClick(2)}
              cursor="pointer"
            >
              Software Engineer & Web Developer
            </MotionText>

            <MotionText
              fontSize="lg"
              color={textColor}
              mb={8}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              onClick={() => handleAreaClick(3)}
              cursor="pointer"
            >
              I build modern, responsive web applications with a focus on user experience and clean code.
              Passionate about creating intuitive interfaces and solving complex problems.
            </MotionText>

            <Stack
              direction={{ base: 'column', sm: 'row' }}
              spacing={4}
              mb={8}
            >
              <Button
                size="lg"
                colorScheme="brand"
                rightIcon={<ChevronDownIcon />}
                onClick={scrollToProjects}
                _hover={{
                  transform: 'translateY(-5px)',
                  boxShadow: 'xl',
                }}
                transition="all 0.3s ease"
              >
                View My Work
              </Button>

              <Button
                size="lg"
                variant="outline"
                as="a"
                href="#contact"
                _hover={{
                  transform: 'translateY(-5px)',
                  boxShadow: 'md',
                  borderColor: accentColor,
                }}
                transition="all 0.3s ease"
              >
                Contact Me
              </Button>
            </Stack>

            <Stack direction="row" spacing={4}>
              <IconButton
                as="a"
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                icon={<FaGithub />}
                size="md"
                colorScheme="gray"
                variant="ghost"
                _hover={{
                  transform: 'translateY(-3px)',
                  color: accentColor,
                }}
                transition="all 0.3s ease"
              />
              <IconButton
                as="a"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                icon={<FaLinkedin />}
                size="md"
                colorScheme="gray"
                variant="ghost"
                _hover={{
                  transform: 'translateY(-3px)',
                  color: accentColor,
                }}
                transition="all 0.3s ease"
              />
              <IconButton
                as="a"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                icon={<FaTwitter />}
                size="md"
                colorScheme="gray"
                variant="ghost"
                _hover={{
                  transform: 'translateY(-3px)',
                  color: accentColor,
                }}
                transition="all 0.3s ease"
              />
            </Stack>
          </MotionFlex>

          <MotionBox
            w={{ base: '80%', md: '40%' }}
            mt={{ base: 10, md: 0 }}
            display="flex"
            justifyContent="center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box
              position="relative"
              w="300px"
              h="300px"
              borderRadius="full"
              bg={useColorModeValue('brand.100', 'brand.900')}
              border="4px solid"
              borderColor={useColorModeValue('brand.200', 'brand.700')}
              overflow="hidden"
              animation={floatAnimation}
              boxShadow="xl"
            >
              {/* Replace with your image */}
              <Text
                fontSize="6xl"
                textAlign="center"
                lineHeight="300px"
                animation={pulseAnimation}
              >
                💻
              </Text>

              {/* Small decorative elements */}
              <Box
                position="absolute"
                top="10%"
                right="10%"
                w="20px"
                h="20px"
                borderRadius="full"
                bg="accent.400"
                animation={pulseAnimation}
              />
              <Box
                position="absolute"
                bottom="15%"
                left="10%"
                w="15px"
                h="15px"
                borderRadius="full"
                bg="brand.300"
                animation={`${pulseAnimation} 2.5s ease-in-out infinite`}
              />
            </Box>
          </MotionBox>
        </Flex>
      </Container>

      {/* Scroll indicator */}
      <Box
        position="absolute"
        bottom="30px"
        left="50%"
        transform="translateX(-50%)"
        animation={`${pulse} 2s ease-in-out infinite`}
        cursor="pointer"
        onClick={scrollToProjects}
      >
        <Icon as={ChevronDownIcon} w={10} h={10} color={accentColor} />
      </Box>
    </Box>
  );
};

export default Hero;
