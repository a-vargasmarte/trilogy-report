import React, { Component } from 'react';
import GrommetComponent from './GrommetComponent';
import { grommet } from 'grommet/themes';
import GrommetGrid from './GrommetGrid';
import HeaderBox from './HeaderBox';
import SideNavBox from './SideNavBox';
import SideNavBoxButtons from './SideNavBoxButtons';
import SideNavButton from './SideNavButton';
import { Copy, Upload } from 'grommet-icons';
import { Button, Text, Box, Distribution } from 'grommet';
import { Link } from 'react-router-dom';
class Layout extends Component {
  state = {
    sidebar: true,
    grid: {
      rows: ['auto', 'flex'],
      columns: ['auto', 'flex'],
      areas: [
        { name: 'header', start: [0, 0], end: [1, 0] },
        { name: 'main', start: [0, 1], end: [1, 1] }
      ]
    },
    HeaderBox: {
      gridArea: 'header',
      direction: 'row',
      alignContent: '',
      justify: 'between',
      pad: {
        horizontal: 'medium'
        // vertical: '2px'
      },
      background: 'light-1'
    }
  };

  render() {
    return (
      <GrommetComponent full theme={grommet}>
        <GrommetGrid
          fill
          rows={this.state.grid.rows}
          columns={this.state.grid.columns}
          areas={this.state.grid.areas}
        >
          <HeaderBox
            gridArea={this.state.HeaderBox.gridArea}
            direction={this.state.HeaderBox.direction}
            alignContent={this.state.HeaderBox.alignContent}
            justify={this.state.HeaderBox.justify}
            pad={this.state.HeaderBox.pad}
            background={this.state.HeaderBox.background}
          >
            <SideNavButton />
            <Box direction="row">
              <Link to='/marie'>
                <Button
                  icon={<Copy color="plain" size="medium" />}
                  onClick={() => {}}
                />
              </Link>

              <Button
                icon={<Upload color="plain" size="medium" />}
                hoverIndicator
                onClick={() => {}}
              />
            </Box>
            {/* </Box> */}
          </HeaderBox>
          {this.props.children}
        </GrommetGrid>
      </GrommetComponent>
    );
  }
}

export default Layout;
