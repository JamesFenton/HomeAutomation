import React, { useState, useEffect } from "react";
import "./bootstrap.css";
import { getTemperatures } from "./api";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import TemperatureChart from "./TemperatureChart";
import { IDeviceReading } from "../server/DeviceReading";

export default function () {
  const [readings, setReadings] = useState<IDeviceReading[]>([]);

  useEffect(() => {
    getTemperatures().then(setReadings);
  }, []);

  return (
    <Container style={{ marginTop: 15 }}>
      <Card text="white">
        <Card.Header as="h5">Temperature History</Card.Header>
        <Card.Body>
          <TemperatureChart readings={readings} />
        </Card.Body>
      </Card>
    </Container>
  );
}
