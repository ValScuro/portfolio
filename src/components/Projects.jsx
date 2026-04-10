import React, { useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Badge,
  Button,
  useColorModeValue,
  Icon,
  LinkBox,
  LinkOverlay,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt, FaLock } from 'react-icons/fa';

// Wrap Chakra components with Framer Motion
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionSimpleGrid = motion(SimpleGrid);

// Project data from Valerie's resume
const projectsData = [
  {
    id: 1,
    title: 'Game Development Team Management System',
    description: 'A robust task and project management tool for game development teams with role-based access, live status updates, and visual progress tracking.',
    image: 'images/game-dev-manager.png',
    tags: ['React', 'Node.js', 'MySQL', 'Express', 'Sequelize', 'Docker', 'JWT'],
    githubUrl: 'https://github.com/Scott-Hewitt/gamedev-team-management-app',
    liveUrl: null, // No live URL provided
    details: 'Built a robust task and project management tool for game development teams with role-based access, live status updates, and visual progress tracking. Integrated JWT-based authentication and RESTful APIs using Express and Sequelize. Containerized with Docker and monitored via Prometheus and Grafana for observability. Emphasized modular backend architecture and reusable UI components for scalability.'
  },
  {
    id: 2,
    title: 'MIDI Melody & Chord Generator',
    description: 'An interactive music composition tool that generates MIDI melodies and chord progressions based on user-defined music theory parameters.',
    image: 'images/miditool.png',
    tags: ['React', 'Tone.js', 'Firebase', 'JZZ.js', 'Chakra UI'],
    githubUrl: 'https://github.com/Scott-Hewitt/midi-tool',
    liveUrl: null, // No live URL provided
    details: 'Developed an interactive music composition tool that generates MIDI melodies and chord progressions based on user-defined music theory parameters. Implemented real-time playback using Tone.js and MIDI export with JZZ.js. Managed authentication and cloud storage via Firebase. Designed for accessibility and ease of use, leveraging Chakra UI and responsive design.'
  }
];

const ProjectCard = ({ project, onClick }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.100');
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

  return (
    <MotionBox
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={controls}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      as={LinkBox}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={cardBg}
      borderColor={borderColor}
      boxShadow="md"
      _hover={{ boxShadow: 'xl' }}
      transition="all 0.3s ease"
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        h="200px"
        bg="gray.300"
        position="relative"
        overflow="hidden"
      >
        <Image
          src={project.image}
          alt={project.title}
          objectFit="cover"
          w="100%"
          h="100%"
          transition="transform 0.3s ease"
          _groupHover={{ transform: 'scale(1.05)' }}
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.400"
          opacity="0"
          _groupHover={{ opacity: 1 }}
          transition="opacity 0.3s ease"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            onClick={(e) => {
              e.preventDefault();
              onClick(project);
            }}
            size="sm"
            colorScheme="brand"
          >
            View Details
          </Button>
        </Box>
      </Box>

      <Flex direction="column" p={5} flex="1">
        <Heading size="md" mb={2} color={textColor}>
          <LinkOverlay href="#" onClick={(e) => {
            e.preventDefault();
            onClick(project);
          }}>
            {project.title}
          </LinkOverlay>
        </Heading>

        <Text fontSize="sm" color={textColor} mb={4} flex="1">
          {project.description}
        </Text>

        <Box>
          <Flex wrap="wrap" mb={4}>
            {project.tags.map((tag, index) => (
              <Badge
                key={index}
                mr={2}
                mb={2}
                colorScheme="brand"
                variant="subtle"
                borderRadius="full"
                px={3}
                py={1}
              >
                {tag}
              </Badge>
            ))}
          </Flex>

          <Flex justify="space-between" align="center">
            <Button
              as="a"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              leftIcon={<FaGithub />}
              variant="ghost"
              colorScheme="gray"
              onClick={(e) => e.stopPropagation()}
            >
              Code
            </Button>

            {project.liveUrl ? (
              <Button
                as="a"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                leftIcon={<FaExternalLinkAlt />}
                variant="ghost"
                colorScheme="brand"
                onClick={(e) => e.stopPropagation()}
              >
                Live Demo
              </Button>
            ) : (
              <Button
                size="sm"
                leftIcon={<FaLock />}
                variant="ghost"
                colorScheme="gray"
                isDisabled
                cursor="not-allowed"
                onClick={(e) => e.stopPropagation()}
              >
                Private
              </Button>
            )}
          </Flex>
        </Box>
      </Flex>
    </MotionBox>
  );
};

const Projects = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProject, setSelectedProject] = React.useState(null);
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const accentColor = useColorModeValue('brand.600', 'brand.300');

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

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    onOpen();
  };

  // Easter egg - hidden project
  const secretRef = useRef(null);
  const [secretHovered, setSecretHovered] = React.useState(0);

  useEffect(() => {
    if (secretHovered >= 5) {
      alert('You found a hidden project! 🚀');

      // Update localStorage to mark this easter egg as found
      const unlockedEggs = JSON.parse(localStorage.getItem('unlockedEasterEggs') || '[]');
      if (!unlockedEggs.includes('hover')) {
        unlockedEggs.push('hover');
        localStorage.setItem('unlockedEasterEggs', JSON.stringify(unlockedEggs));
      }

      setSecretHovered(0);
    }
  }, [secretHovered]);

  return (
    <Box
      id="projects"
      as="section"
      py={20}
      bg={bgColor}
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
            My Projects
          </Heading>
          <Text
            fontSize="xl"
            textAlign="center"
            maxW="800px"
            mt={8}
            color={textColor}
          >
            Here are some of my recent projects. Each one presented unique challenges and opportunities to learn and grow as a developer.
          </Text>
        </MotionFlex>

        <MotionSimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={10}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={handleProjectClick}
            />
          ))}

          {/* Hidden easter egg project */}
          <Box
            ref={secretRef}
            position="absolute"
            bottom="20px"
            right="20px"
            w="10px"
            h="10px"
            borderRadius="full"
            bg="transparent"
            cursor="pointer"
            onMouseEnter={() => setSecretHovered(prev => prev + 1)}
            zIndex="1"
          />
        </MotionSimpleGrid>
      </Container>

      {/* Project Details Modal */}
      {selectedProject && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
          <ModalOverlay backdropFilter="blur(10px)" />
          <ModalContent bg={useColorModeValue('white', 'gray.800')}>
            <ModalHeader>{selectedProject.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                borderRadius="md"
                mb={4}
              />

              <Text mb={4}>{selectedProject.details}</Text>

              <Divider my={4} />

              <VStack align="start" spacing={4}>
                <Box>
                  <Text fontWeight="bold" mb={2}>Technologies Used:</Text>
                  <HStack wrap="wrap">
                    {selectedProject.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        colorScheme="brand"
                        variant="subtle"
                        borderRadius="full"
                        px={3}
                        py={1}
                        mr={2}
                        mb={2}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </HStack>
                </Box>

                <HStack spacing={4}>
                  <Button
                    as="a"
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    leftIcon={<FaGithub />}
                    colorScheme="gray"
                  >
                    View Code
                  </Button>

                  {selectedProject.liveUrl && (
                    <Button
                      as="a"
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      leftIcon={<FaExternalLinkAlt />}
                      colorScheme="brand"
                    >
                      Live Demo
                    </Button>
                  )}
                </HStack>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Projects;
