import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import  { Button, Link, TabList, TabPanel } from 'instructure-ui';
import InstUICanvasTheme from '../lib/';
import 'instructure-ui/dist/components/Button.css';
import 'instructure-ui/dist/components/Link.css';
import 'instructure-ui/dist/components/TabList.css';

function Example() {
  return (
    <InstUICanvasTheme host="http://127.0.0.1:3000">
      <div>
        <h2>TabList</h2>
        <TabList>
          <TabPanel title="First Tab">
            First place :-)
          </TabPanel>
          <TabPanel title="Second Tab">
            Second place :-|
          </TabPanel>
          <TabPanel title="Third Tab">
            Third place :-(
          </TabPanel>
        </TabList>

        <h2>Button</h2>
        <Button>Default button</Button>{' '}
        <Button variant="primary">Primary button</Button>{' '}
        <Button variant="link">Link button</Button>

        <h2>Link</h2>
        <Link href="javascript://">I'm a link</Link>
      </div>
    </InstUICanvasTheme>
  );
}

ReactDOM.render(<Example/>, document.getElementById('container'));
