import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Grid, Row, Col } from 'react-bootstrap';

class AppComponent extends Component {

// create and authorize new lock before render

  componentWillMount() {
    this.lock = new Auth0Lock('mvkhO3zHQdyTSncKbpqGcYoJljpGxGgN', 'john-ivan.auth0.com');
  }

  render() {
    return (
      <div>
{/* Pass down lock as a prop */}
        <Header lock={this.lock}></Header>
        <Grid>
          <Row>
            <Col xs={12} md={3}>
              <Sidebar />
            </Col>
            <Col xs={12} md={9}>
              {/* Displays child routes from React Routers */}
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AppComponent;
