import React from 'react';
import { Button, Text, Box } from 'grommet';
import { Link } from 'react-router-dom';

const SideNavButton = ({ onClick }) => {
  return (
    <Box direction="row">
      <Link to='/'>
        <Button onClick={onClick} size="small">
          <Text color="dark-1">4D VIDEO</Text>
        </Button>
      </Link>
    </Box>
  );
};

export default SideNavButton;
