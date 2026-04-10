import React, { useEffect, useState } from 'react';
import { Box, useColorMode, useDisclosure } from '@chakra-ui/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EasterEgg from './components/EasterEgg';

const App = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [keySequence, setKeySequence] = useState([]);

  // Easter egg - console message
  useEffect(() => {
    console.log(
      '%c👋 Hello curious developer! 👋\n' +
      '%cThanks for checking out my portfolio.\n' +
      '%cFeel free to explore the code and discover more easter eggs!\n' +
      '%cHint: Try the Konami code ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️',
      'font-size: 20px; font-weight: bold; color: #00bcd4;',
      'font-size: 16px; color: #4dd0e1;',
      'font-size: 14px; color: #80deea;',
      'font-size: 12px; font-style: italic; color: #b2ebf2;'
    );
  }, []);

  // Easter egg - keyboard shortcut to open Easter Eggs collection
  useEffect(() => {
    const eggCode = ['e', 'g', 'g'];

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const newSequence = [...keySequence, key];

      // Keep only the last 3 keys pressed
      if (newSequence.length > 3) {
        newSequence.shift();
      }

      setKeySequence(newSequence);

      // Check if the sequence matches the egg code
      if (newSequence.length === 3 && 
          newSequence.every((k, i) => k === eggCode[i])) {
        onOpen();
        setKeySequence([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keySequence, onOpen]);

  return (
    <Box
      bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'}
      color={colorMode === 'dark' ? 'white' : 'gray.800'}
      minH="100vh"
      transition="all 0.3s ease"
    >
      <Header />
      <Hero />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      <EasterEgg isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default App;
