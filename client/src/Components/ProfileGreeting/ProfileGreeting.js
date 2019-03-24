import React, { Component } from 'react';
import { Box, Heading, Text, Button, Select, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import axios from 'axios';
import DataReader from '../DataReader/DataReader';

class ProfileGreeting extends Component {
  state = {
    gridArea: 'main',
    justify: 'center',
    align: 'center',
    buttonTabs: {
      myDatasetsTab: {
        active: true,
        value: 'dark-1'
      },
      uploadDatasetsTab: {
        active: false,
        value: 'status-disabled'
      }
    },
    selectSearch: {
      options: [],
      value: ''
    }
  };

  handleGreetingButton = e => {
    e.preventDefault();
    console.log(e.target);
    let { buttonTabs } = this.state;

    if (
      buttonTabs.myDatasetsTab.active &&
      buttonTabs.uploadDatasetsTab.active === false &&
      buttonTabs.myDatasetsTab.value === 'dark-1' &&
      buttonTabs.uploadDatasetsTab.value === 'status-disabled'
    ) {
      buttonTabs.myDatasetsTab.active = false;
      buttonTabs.myDatasetsTab.value = 'status-disabled';
      buttonTabs.uploadDatasetsTab.active = true;
      buttonTabs.uploadDatasetsTab.value = 'dark-1';
      this.setState({
        buttonTabs
      });
      // console.log(this.state)
    } else if (
      buttonTabs.uploadDatasetsTab.active &&
      buttonTabs.myDatasetsTab.active === false &&
      buttonTabs.uploadDatasetsTab.value === 'dark-1' &&
      buttonTabs.myDatasetsTab.value === 'status-disabled'
    ) {
      buttonTabs.uploadDatasetsTab.active = false;
      buttonTabs.uploadDatasetsTab.value = 'status-disabled';
      buttonTabs.myDatasetsTab.active = true;
      buttonTabs.myDatasetsTab.value = 'dark-1';

      this.setState({
        myDatasetsTab: 'dark-1',
        uploadDatasetsTab: 'status-disabled'
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <Box
          gridArea={this.state.gridArea}
          justify={this.state.justify}
          align={this.state.align}
        >
          <Heading level={1}>Welcome, {this.props.name}</Heading>
          <Text size={'large'}>Visualize your datasets</Text>
          <Text align="center">or upload a new dataset</Text>
          <Button
            primary
            label="My Datasets"
            color={this.state.buttonTabs.myDatasetsTab.value}
            margin="large"
            id={this.state.buttonTabs.myDatasetsTab.id}
            onClick={this.handleGreetingButton}
          />
          <Button
            key="bleeps"
            primary
            label="Upload Dataset"
            color={this.state.buttonTabs.uploadDatasetsTab.value}
            margin="large"
            id="uploadDatasetsTab"
            onClick={this.handleGreetingButton}
          />
        </Box>

        {this.state.buttonTabs.myDatasetsTab.active ? (
          <Grommet full theme={grommet}>
            <Box fill align="center" justify="start" pad="large">
              <Box direction="row" align="center" gap="small" pad="xsmall">
                {this.props.children}
              </Box>
            </Box>
          </Grommet>
        ) : (
          <DataReader
            readerLabel={this.props.readerLabel}
            loadFile={this.props.loadFile}
          />
        )}
      </React.Fragment>
    );
  }
}

export default ProfileGreeting;
