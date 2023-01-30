import React from 'react';
import { Box, Button, Link } from '@mui/joy';

import { FiGithub } from 'react-icons/fi';
import GameView from '../components/GameView';


export default function Game() {
  return (
    <Box
      component="div"
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Link
        href="https://github.com/BSoDium/lidar/fork"
        underline="none"
        target="_blank"
        sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}
      >
        <Button
          color="neutral"
          variant='soft'
          size='lg'
          startDecorator={<FiGithub />}
          sx={{ boxShadow: "md", borderRadius: 9999 }}
        >
          Fork on GitHub
        </Button>
      </Link>

      <GameView />
    </Box>
  );
}