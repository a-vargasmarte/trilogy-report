import React, { Component } from "react";
import MemberCard from "./MemberCard";
import Layout from "./Layout";
import axios from "axios";

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
        axios
          .get("https://api.github.com/repos/jordysalguero/project_one/stats/contributors")
          .then(res => {
            console.log(res);
          })
          .catch(err => console.log(err));
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
      <Layout
        gridAreas={gridAreas}
        name={name}
        value={this.state.currentGroup.value}
      >
        {gridAreas.map((area, i) => {
          if (i >= 3) {
            return <MemberCard area={area} groupMembers={groupMembers} i={i} key={i} />;
          }
          return null;
        })}
      </Layout>
    );
  }
}

export default ReportCard;
