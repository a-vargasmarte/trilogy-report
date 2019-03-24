import React, { Component } from 'react';
import { Box, Heading, Text, Button } from 'grommet';
import { Copy, Edit } from 'grommet-icons';
class Marie extends Component {
  state = {
    currentUser: {
      name: '',
      email: ''
    }
  };

  componentDidMount() {
    const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    let currentUser = this.state.currentUser;
    currentUser.name = idToken.idToken.claims.name;
    currentUser.email = idToken.idToken.claims.email;
    this.setState({
      currentUser: currentUser
    });
  }
  render() {
    const { name, email } = this.state.currentUser;
    return (
      <Box align="end">
        <Heading level={3}>Welcome, {name}</Heading>
        <Box direction="row-responsive">
          {/* <Button color="plain" icon={<Copy color="plain" size="large" />} />
          <Button color="plain" icon={<Edit color="plain" size="large" />} /> */}
        </Box>
      </Box>
    );
  }
}

export default Marie;
