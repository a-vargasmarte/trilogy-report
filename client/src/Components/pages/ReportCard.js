import React, { Component } from "react";
import { Box, Heading, Text, Button, Grid, Grommet, Meter } from "grommet";
import { Copy, Edit } from "grommet-icons";
import axios from "axios";
import { grommet } from "grommet/themes";
class ReportCard extends Component {
  state = {
    currentUser: {
      name: "",
      email: ""
    },
    groupGrades: [],
    groupMembers: [],
    currentGroup: []
  };

  componentDidMount() {
    axios
      .get("/hello")
      .then(res => {
        // console.log(res.data.data);
        let { groupGrades, currentGroup } = this.state;
        groupGrades = res.data.data;
        const idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
        let currentUser = this.state.currentUser;
        currentUser.name = idToken.idToken.claims.name;
        currentUser.email = idToken.idToken.claims.email;

        let { email } = currentUser;

        groupGrades.map((group, i) => {
          // console.log(`${group.group}${i+1}`.split(`${i+1}`)[0].concat(`${i}`).toLowerCase());
          let groupName = `${group.group}${i + 1}`
            .split(`${i + 1}`)[0]
            .concat(`${i + 1}`)
            .toLowerCase();

          if (email.includes(groupName)) {
            currentGroup = group;
            console.log(currentGroup);
          }
        });
        // console.log(currentGroup.group.replace(/Group[1-6] -/g, "").split(","));
        let groupMembers = currentGroup.group
          .replace(/Group[1-6] -/g, "")
          .split(",");
        this.setState({
          currentGroup: currentGroup,
          groupMembers: groupMembers
        });
        // console.log(this.state.currentGroup);

        this.setState({
          currentUser,
          groupGrades
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { name, email } = this.state.currentUser;
    // console.log(name);
    // console.log(this.state.currentGroup);
    const { currentGroup, groupMembers } = this.state;
    console.log(groupMembers);

    let gridAreas = [
      { name: "header", start: [0, 0], end: [2, 0] },
      { name: "nav", start: [0, 1], end: [0, 1] },
      { name: "main", start: [1, 1], end: [2, 1] }
    ];

    groupMembers.map((member, i) => {
      let memberObject = {
        name: `member${i}`,
        start: [0, i + 2],
        end: [2, i + 2]
      };

      gridAreas.push(memberObject);
    });

    console.log(gridAreas);

    return (
      // <Box align="end">

      <Grommet full theme={grommet}>
        <Grid
          fill
          rows={["xsmall", "xsmall", "small", "small", "small", "small"]}
          columns={["xlarge", "small", "small"]}
          gap="xsmall"
          areas={gridAreas}
        >
          <Box gridArea="header" background="neutral-3">
            <Heading level={2}>
              Welcome, {name}. Project 1 is completed!
            </Heading>
          </Box>
          <Box gridArea="nav" background="neutral-3">
            <Heading level={2}>
              Total Score: {this.state.currentGroup.value}
            </Heading>
          </Box>
          <Box gridArea="main" background="neutral-3">
            <Heading level={2}>
              Cohort Average: {this.state.currentGroup.value}
            </Heading>
          </Box>

          {gridAreas.map((area, i) => {
            if (i >= 3) {
              return (
                <Box gridArea={area.name} background="neutral-3">
                  <Heading level={2}>{groupMembers[i - 3]}</Heading>
                </Box>
              );
            }
            return null;
          })}
        </Grid>
      </Grommet>
    );
  }
}

export default ReportCard;
