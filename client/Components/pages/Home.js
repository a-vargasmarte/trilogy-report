import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import { Box, Heading, Text, Button } from 'grommet';

export default withAuth(
  class Home extends Component {
    state = {
      authenticated: null,
      gridArea: 'main',
      justify: 'end',
      align: 'start'
    };

    checkAuthentication = async () => {
      // console.log(this.props);
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    };

    componentDidMount() {
      // console.log(this.props);
      console.log(this.state.authenticated);
      this.checkAuthentication();
    }
    componentDidUpdate() {
      this.checkAuthentication();
    }

    login = async () => {
      this.props.auth.login('/');
    };

    logout = async () => {
      this.props.auth.logout('/');
    };

    render() {
      if (this.state.authenticated === null) return null;

      const mainContent = this.state.authenticated ? (
        <Box
          gridArea={this.state.gridArea}
          justify={this.state.justify}
          align={this.state.align}
        >
          <Button
            primary
            label="Logout"
            color="status-critical"
            margin="large"
            onClick={this.logout}
          />
        </Box>
      ) : (
        <Box
          gridArea={this.state.gridArea}
          justify={this.state.justify}
          direction={'row'}
          align="end"
        >
          <Button
            primary
            label="Login"
            color="dark-1"
            margin="large"
            onClick={this.login}
          />
        </Box>
      );

      return <div>{mainContent}</div>;
    }
  }
);
