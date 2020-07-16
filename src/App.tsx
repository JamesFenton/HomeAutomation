import React, { Component } from "react";
import "./bootstrap.css";
import { getTemperatures } from "./api";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import TemperatureChart from "./TemperatureChart";
import { IDeviceReading } from "../server/DeviceReading";

interface AppState {
  readings: IDeviceReading[];
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
      <Container style={{ marginTop: 15 }}>
        <Card text="white">
          <Card.Header as="h5">Temperature History</Card.Header>
          <Card.Body>
            <TemperatureChart readings={this.state.readings} />
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
