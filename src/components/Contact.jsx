import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  FormErrorMessage,
  useToast,
  Flex,
  Divider,
  Link,
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

// Wrap Chakra components with Framer Motion
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const sectionBgColor = useColorModeValue('gray.50', 'gray.900');
  const accentColor = useColorModeValue('brand.600', 'brand.300');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: 'easeOut' }
      });
    }
  }, [controls, inView]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });

        toast({
          title: 'Message sent!',
          description: "Thanks for reaching out. I'll get back to you soon.",
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });

        // Reset submission status after a delay
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };

  // Easter egg - hidden message in form
  const [easterEggActive, setEasterEggActive] = useState(false);

  const activateEasterEgg = () => {
    if (formData.message.toLowerCase().includes('easter egg')) {
      setEasterEggActive(true);

      // Update localStorage to mark this easter egg as found
      const unlockedEggs = JSON.parse(localStorage.getItem('unlockedEasterEggs') || '[]');
      if (!unlockedEggs.includes('message')) {
        unlockedEggs.push('message');
        localStorage.setItem('unlockedEasterEggs', JSON.stringify(unlockedEggs));
      }

      toast({
        title: '🥚 Easter Egg Found! 🥚',
        description: "You've discovered a hidden message! Keep exploring for more secrets.",
        status: 'info',
        duration: 5000,
        isClosable: true,
        position: 'top',
        variant: 'subtle',
      });
    }
  };

  return (
    <Box
      id="contact"
      as="section"
      py={20}
      bg={sectionBgColor}
      position="relative"
    >
      <Container maxW="container.xl">
        <MotionFlex
          ref={ref}
          initial={{ y: 20, opacity: 0 }}
          animate={controls}
          direction="column"
          align="center"
          mb={16}
        >
          <Heading
            as="h2"
            size="2xl"
            mb={4}
            textAlign="center"
            position="relative"
            _after={{
              content: '""',
              width: '80px',
              height: '4px',
              bg: accentColor,
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            Get In Touch
          </Heading>
          <Text
            fontSize="xl"
            textAlign="center"
            maxW="800px"
            mt={8}
            color={textColor}
          >
            Have a project in mind or want to discuss potential opportunities? 
            Feel free to reach out using the form below or through my social media channels.
          </Text>
        </MotionFlex>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
          {/* Contact Form */}
          <MotionBox
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            bg={bgColor}
            p={8}
            borderRadius="lg"
            boxShadow="md"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Heading size="md" mb={6} color={accentColor}>
              Send Me a Message
            </Heading>

            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isInvalid={errors.name}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    focusBorderColor="brand.500"
                    _hover={{ borderColor: 'brand.300' }}
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    focusBorderColor="brand.500"
                    _hover={{ borderColor: 'brand.300' }}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.subject}>
                  <FormLabel htmlFor="subject">Subject</FormLabel>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    focusBorderColor="brand.500"
                    _hover={{ borderColor: 'brand.300' }}
                  />
                  <FormErrorMessage>{errors.subject}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.message}>
                  <FormLabel htmlFor="message">Message</FormLabel>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={activateEasterEgg}
                    focusBorderColor="brand.500"
                    _hover={{ borderColor: 'brand.300' }}
                    rows={5}
                  />
                  <FormErrorMessage>{errors.message}</FormErrorMessage>
                </FormControl>

                <Button
                  mt={4}
                  colorScheme="brand"
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="Sending..."
                  w="full"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.3s ease"
                >
                  {isSubmitted ? 'Message Sent!' : 'Send Message'}
                </Button>
              </VStack>
            </form>
          </MotionBox>

          {/* Contact Information */}
          <MotionBox
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            bg={bgColor}
            p={8}
            borderRadius="lg"
            boxShadow="md"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Heading size="md" mb={6} color={accentColor}>
              Contact Information
            </Heading>

            <VStack spacing={6} align="start">
              <HStack spacing={4}>
                <Flex
                  w="40px"
                  h="40px"
                  bg="brand.500"
                  color="white"
                  borderRadius="full"
                  justify="center"
                  align="center"
                  as={motion.div}
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon as={FaEnvelope} boxSize={5} />
                </Flex>
                <Box>
                  <Text fontWeight="bold">Email</Text>
                  <Link href="mailto:valeriehewitt1996@gmail.com" color={accentColor}>
                    valeriehewitt1996@gmail.com
                  </Link>
                </Box>
              </HStack>

              <HStack spacing={4}>
                <Flex
                  w="40px"
                  h="40px"
                  bg="brand.500"
                  color="white"
                  borderRadius="full"
                  justify="center"
                  align="center"
                  as={motion.div}
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon as={FaMapMarkerAlt} boxSize={5} />
                </Flex>
                <Box>
                  <Text fontWeight="bold">Location</Text>
                  <Text>Sydney, Australia</Text>
                </Box>
              </HStack>

              <Divider my={4} />

              <Box w="full">
                <Text fontWeight="bold" mb={4}>Connect with me</Text>
                <HStack spacing={4}>
                  <Link
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Flex
                      w="40px"
                      h="40px"
                      bg={useColorModeValue('gray.100', 'gray.700')}
                      color={useColorModeValue('gray.800', 'white')}
                      borderRadius="full"
                      justify="center"
                      align="center"
                      as={motion.div}
                      whileHover={{ y: -5, boxShadow: '0 5px 10px rgba(0,0,0,0.2)' }}
                      transition="all 0.3s ease"
                    >
                      <Icon as={FaGithub} boxSize={5} />
                    </Flex>
                  </Link>

                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Flex
                      w="40px"
                      h="40px"
                      bg={useColorModeValue('gray.100', 'gray.700')}
                      color={useColorModeValue('gray.800', 'white')}
                      borderRadius="full"
                      justify="center"
                      align="center"
                      as={motion.div}
                      whileHover={{ y: -5, boxShadow: '0 5px 10px rgba(0,0,0,0.2)' }}
                      transition="all 0.3s ease"
                    >
                      <Icon as={FaLinkedin} boxSize={5} />
                    </Flex>
                  </Link>

                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <Flex
                      w="40px"
                      h="40px"
                      bg={useColorModeValue('gray.100', 'gray.700')}
                      color={useColorModeValue('gray.800', 'white')}
                      borderRadius="full"
                      justify="center"
                      align="center"
                      as={motion.div}
                      whileHover={{ y: -5, boxShadow: '0 5px 10px rgba(0,0,0,0.2)' }}
                      transition="all 0.3s ease"
                    >
                      <Icon as={FaTwitter} boxSize={5} />
                    </Flex>
                  </Link>
                </HStack>
              </Box>

              <Box
                mt={8}
                p={6}
                bg={useColorModeValue('gray.50', 'gray.700')}
                borderRadius="md"
                borderLeft="4px solid"
                borderColor="brand.500"
                w="full"
              >
                <Text fontStyle="italic" fontSize="sm">
                  "I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision."
                </Text>
              </Box>
            </VStack>
          </MotionBox>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Contact;
