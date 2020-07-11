import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { TemperatureReading, getTemperatures } from "./api";
import { Container, Card, Row, Col } from "react-bootstrap";
import TemperatureChart from "./TemperatureChart";

interface AppState {
  readings: TemperatureReading[];
}

export default class App extends Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = { readings: [] };
  }

  componentDidMount() {
    getTemperatures().then((t) => this.setState({ readings: t }));
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md={1}></Col>
          <Col>
            <Card>
              <Card.Header>Temperature Indoors</Card.Header>
              <Card.Body>
                <TemperatureChart readings={this.state.readings} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>
    );
  }
}
