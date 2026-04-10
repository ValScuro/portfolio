import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  Flex,
  useColorModeValue,
  Icon,
  VStack,
  Heading,
  Badge,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaTrophy, FaLock, FaUnlock } from 'react-icons/fa';

// Wrap Chakra components with Framer Motion
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

// List of all easter eggs in the site
const easterEggs = [
  {
    id: 'konami',
    name: 'Konami Code',
    description: 'Enter the famous Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A',
    hint: 'Try pressing some arrow keys followed by B and A',
    unlocked: false,
  },
  {
    id: 'heart',
    name: 'Heart Clicks',
    description: 'Click the heart in the footer 10 times',
    hint: 'Some things are made with love... a lot of love',
    unlocked: false,
  },
  {
    id: 'message',
    name: 'Secret Message',
    description: 'Type "easter egg" in the contact form message field',
    hint: 'The contact form might be hiding something',
    unlocked: false,
  },
  {
    id: 'pattern',
    name: 'Click Pattern',
    description: 'Click on specific elements in the hero section in the right order',
    hint: 'Try clicking on different parts of the introduction in a pattern',
    unlocked: false,
  },
  {
    id: 'hover',
    name: 'Hidden Project',
    description: 'Hover over a specific area in the projects section multiple times',
    hint: 'There might be an invisible spot in the projects section',
    unlocked: false,
  },
];

const EasterEgg = ({ isOpen, onClose }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const accentColor = useColorModeValue('brand.500', 'brand.300');
  
  // Load unlocked easter eggs from localStorage
  useEffect(() => {
    const unlockedEggs = JSON.parse(localStorage.getItem('unlockedEasterEggs') || '[]');
    
    easterEggs.forEach(egg => {
      if (unlockedEggs.includes(egg.id)) {
        egg.unlocked = true;
      }
    });
  }, [isOpen]);

  // Function to unlock an easter egg
  const unlockEasterEgg = (id) => {
    const unlockedEggs = JSON.parse(localStorage.getItem('unlockedEasterEggs') || '[]');
    
    if (!unlockedEggs.includes(id)) {
      unlockedEggs.push(id);
      localStorage.setItem('unlockedEasterEggs', JSON.stringify(unlockedEggs));
      
      // Update the egg's unlocked status
      const eggIndex = easterEggs.findIndex(egg => egg.id === id);
      if (eggIndex !== -1) {
        easterEggs[eggIndex].unlocked = true;
      }
    }
  };

  // For demonstration purposes, let's unlock an egg when the modal opens
  useEffect(() => {
    if (isOpen) {
      // This is just for demonstration - in a real app, this would be triggered by actual user actions
      // unlockEasterEgg('konami');
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg={bgColor}>
        <ModalHeader
          bgGradient={`linear(to-r, ${accentColor}, accent.500)`}
          bgClip="text"
        >
          Easter Eggs Collection
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text mb={6}>
            You've discovered the easter eggs page! Find all the hidden interactions throughout the site to unlock these achievements.
          </Text>
          
          <VStack spacing={4} align="stretch">
            {easterEggs.map((egg) => (
              <MotionBox
                key={egg.id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                borderColor={egg.unlocked ? accentColor : 'gray.200'}
                bg={egg.unlocked ? useColorModeValue('brand.50', 'rgba(0, 188, 212, 0.1)') : 'transparent'}
                whileHover={{ y: -2, boxShadow: 'md' }}
                transition="all 0.2s ease"
              >
                <Flex justify="space-between" align="center">
                  <Heading size="sm" color={textColor}>
                    {egg.name}
                  </Heading>
                  <Badge colorScheme={egg.unlocked ? 'green' : 'gray'}>
                    {egg.unlocked ? 'Unlocked' : 'Locked'}
                  </Badge>
                </Flex>
                
                <Text mt={2} fontSize="sm" color={textColor}>
                  {egg.unlocked ? egg.description : egg.hint}
                </Text>
                
                <Flex justify="flex-end" mt={2}>
                  <Icon
                    as={egg.unlocked ? FaUnlock : FaLock}
                    color={egg.unlocked ? 'green.500' : 'gray.400'}
                    boxSize={4}
                  />
                </Flex>
              </MotionBox>
            ))}
          </VStack>
          
          <MotionFlex
            mt={8}
            p={4}
            borderRadius="md"
            bg={useColorModeValue('yellow.50', 'rgba(236, 201, 75, 0.1)')}
            borderWidth="1px"
            borderColor="yellow.200"
            align="center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Icon as={FaTrophy} color="yellow.400" boxSize={6} mr={3} />
            <Box>
              <Text fontWeight="bold" color={textColor}>
                Achievement Hunter
              </Text>
              <Text fontSize="sm" color={textColor}>
                Unlock all easter eggs to earn the "Master Explorer" badge!
              </Text>
            </Box>
          </MotionFlex>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EasterEgg;