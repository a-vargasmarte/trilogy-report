import React from "react";
import { grommet, Grommet, Grid, Box, Heading } from "grommet";

const Layout = ({ gridAreas, name, value, children }) => {
  return (
    <Grommet full theme={grommet}>
      <Grid
        fill
        rows={["xsmall", "xsmall", "small", "small", "small", "small"]}
        columns={["xlarge", "small", "small"]}
        gap="xsmall"
        areas={gridAreas}
      >
        <Box gridArea="header" background="neutral-3">
          <Heading level={2}>Welcome, {name}. Project 1 is completed!</Heading>
        </Box>
        <Box gridArea="nav" background="neutral-3">
          <Heading level={2}>Total Score: {value}</Heading>
        </Box>
        <Box gridArea="main" background="neutral-3">
          <Heading level={2}>Cohort Average: {value}</Heading>
        </Box>
        {children}
      </Grid>
    </Grommet>
  );
};

export default Layout;
