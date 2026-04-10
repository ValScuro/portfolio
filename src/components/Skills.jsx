import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Icon,
  useColorModeValue,
  Progress,
  VStack,
  HStack,
  Tag,
  Tooltip,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaDatabase,
  FaGitAlt,
  FaDocker,
  FaFigma,
  FaAws,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiRedux,
  SiMongodb,
  SiPostgresql,
  SiGraphql,
  SiNextdotjs,
  SiExpress,
  SiTailwindcss,
  SiChakraui,
  SiFirebase,
} from 'react-icons/si';

// Wrap Chakra components with Framer Motion
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);

// Skill categories with their respective skills
const skillCategories = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', icon: FaReact, level: 90, color: '#61DAFB' },
      { name: 'JavaScript', icon: FaJs, level: 85, color: '#F7DF1E' },
      { name: 'TypeScript', icon: SiTypescript, level: 80, color: '#3178C6' },
      { name: 'HTML5', icon: FaHtml5, level: 95, color: '#E34F26' },
      { name: 'CSS3', icon: FaCss3Alt, level: 90, color: '#1572B6' },
      { name: 'Redux', icon: SiRedux, level: 75, color: '#764ABC' },
      { name: 'Next.js', icon: SiNextdotjs, level: 80, color: '#000000' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, level: 85, color: '#06B6D4' },
      { name: 'Chakra UI', icon: SiChakraui, level: 85, color: '#319795' },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', icon: FaNodeJs, level: 85, color: '#339933' },
      { name: 'Express', icon: SiExpress, level: 80, color: '#000000' },
      { name: 'MongoDB', icon: SiMongodb, level: 75, color: '#47A248' },
      { name: 'PostgreSQL', icon: SiPostgresql, level: 70, color: '#336791' },
      { name: 'GraphQL', icon: SiGraphql, level: 65, color: '#E10098' },
      { name: 'Firebase', icon: SiFirebase, level: 80, color: '#FFCA28' },
    ],
  },
  {
    name: 'Tools & Others',
    skills: [
      { name: 'Git', icon: FaGitAlt, level: 90, color: '#F05032' },
      { name: 'Docker', icon: FaDocker, level: 70, color: '#2496ED' },
      { name: 'AWS', icon: FaAws, level: 65, color: '#FF9900' },
      { name: 'Figma', icon: FaFigma, level: 75, color: '#F24E1E' },
    ],
  },
];

// Additional skills (without progress bars)
const additionalSkills = [
  'RESTful APIs',
  'Responsive Design',
  'UI/UX Design',
  'Agile/Scrum',
  'Testing (Jest, React Testing Library)',
  'CI/CD',
  'Performance Optimization',
  'Webpack',
  'Vite',
  'Authentication & Authorization',
  'State Management',
  'Microservices',
  'Serverless',
  'Progressive Web Apps',
];

const SkillBar = ({ skill }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        width: `${skill.level}%`,
        transition: { duration: 1, ease: 'easeOut' },
      });
    }
  }, [controls, inView, skill.level]);

  return (
    <Tooltip label={`${skill.level}% proficiency`} placement="top" hasArrow>
      <Box width="100%" mb={4}>
        <Flex align="center" mb={2}>
          <Icon as={skill.icon} color={skill.color} boxSize={6} mr={2} />
          <Text fontWeight="medium">{skill.name}</Text>
        </Flex>
        <Box
          w="100%"
          bg={useColorModeValue('gray.200', 'gray.700')}
          borderRadius="full"
          h="8px"
          overflow="hidden"
          position="relative"
        >
          <MotionBox
            ref={ref}
            initial={{ width: '0%' }}
            animate={controls}
            h="100%"
            bg={skill.color}
            borderRadius="full"
          />
        </Box>
      </Box>
    </Tooltip>
  );
};

const SkillIcon = ({ skill }) => {
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Tooltip label={skill.name} placement="top" hasArrow>
      <Box
        as={motion.div}
        whileHover={{ y: -5, scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        p={3}
        borderRadius="lg"
        bg={bgColor}
        boxShadow="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition="all 0.3s ease"
      >
        <Icon as={skill.icon} boxSize={10} color={skill.color} />
      </Box>
    </Tooltip>
  );
};

const Skills = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const sectionBgColor = useColorModeValue('gray.100', 'gray.900');
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

  // Easter egg - konami code
  const [konamiCode, setKonamiCode] = React.useState([]);
  const konamiSequence = [
    'ArrowUp', 'ArrowUp', 
    'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 
    'ArrowLeft', 'ArrowRight', 
    'b', 'a'
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      const newCode = [...konamiCode, e.key];

      if (newCode.length > konamiSequence.length) {
        newCode.shift();
      }

      setKonamiCode(newCode);

      if (newCode.length === konamiSequence.length && 
          newCode.every((key, i) => key === konamiSequence[i])) {
        alert('Konami Code Activated! You unlocked a secret skill: Time Travel ⏰');

        // Update localStorage to mark this easter egg as found
        const unlockedEggs = JSON.parse(localStorage.getItem('unlockedEasterEggs') || '[]');
        if (!unlockedEggs.includes('konami')) {
          unlockedEggs.push('konami');
          localStorage.setItem('unlockedEasterEggs', JSON.stringify(unlockedEggs));
        }

        setKonamiCode([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiCode]);

  return (
    <Box
      id="skills"
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
            My Skills
          </Heading>
          <Text
            fontSize="xl"
            textAlign="center"
            maxW="800px"
            mt={8}
            color={textColor}
          >
            I've worked with a variety of technologies and tools throughout my career.
            Here's an overview of my technical skills and expertise.
          </Text>
        </MotionFlex>

        {/* Skill Icons Grid */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          mb={16}
        >
          <SimpleGrid columns={{ base: 3, sm: 4, md: 5, lg: 10 }} spacing={6}>
            {skillCategories.flatMap(category => 
              category.skills.map((skill, index) => (
                <SkillIcon key={`${skill.name}-${index}`} skill={skill} />
              ))
            )}
          </SimpleGrid>
        </MotionBox>

        {/* Skill Categories with Progress Bars */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mb={16}>
          {skillCategories.map((category, index) => (
            <MotionBox
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              bg={bgColor}
              p={6}
              borderRadius="lg"
              boxShadow="md"
            >
              <Heading size="md" mb={6} color={accentColor}>
                {category.name}
              </Heading>
              <VStack align="stretch" spacing={4}>
                {category.skills.map((skill) => (
                  <SkillBar key={skill.name} skill={skill} />
                ))}
              </VStack>
            </MotionBox>
          ))}
        </SimpleGrid>

        {/* Additional Skills */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          bg={bgColor}
          p={6}
          borderRadius="lg"
          boxShadow="md"
        >
          <Heading size="md" mb={6} color={accentColor} textAlign="center">
            Additional Skills & Knowledge
          </Heading>
          <Wrap spacing={3} justify="center">
            {additionalSkills.map((skill, index) => (
              <WrapItem key={index}>
                <Tag
                  size="lg"
                  borderRadius="full"
                  variant="subtle"
                  colorScheme="brand"
                  py={2}
                  px={4}
                  as={motion.div}
                  whileHover={{ y: -2, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                  transition="all 0.2s ease"
                >
                  {skill}
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Skills;
