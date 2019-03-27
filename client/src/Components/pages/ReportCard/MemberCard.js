import React from "react";
import { Box, Heading } from "grommet";

const MemberCard = ({area, groupMembers, i}) => {
  return (
    <Box gridArea={area.name} background="neutral-3">
      <Heading level={2}>{groupMembers[i - 3]}</Heading>
    </Box>
  );
};

export default MemberCard;
