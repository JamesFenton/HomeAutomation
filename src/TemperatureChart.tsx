import React, { Component } from "react";
import { TemperatureReading, getTemperatures } from "./api";
import Chart from "chart.js";

interface Props {
  readings: TemperatureReading[];
}

export default class TemperatureList extends Component<Props, {}> {
  chartRef = React.createRef<HTMLCanvasElement>();
  chart: Chart;

  createData() {
    return this.props.readings.map((r) => {
      return { x: new Date(r.timestamp), y: r.temperature };
    });
  }

  componentDidUpdate() {
    this.chart.data.datasets[0].data = this.createData();
    this.chart.update();
  }

  componentDidMount() {
    const data = this.createData();
    const ctx = this.chartRef.current;
    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Desk",
            fill: false,
            data: data,
            backgroundColor: "#3366ff",
            borderColor: "#3366ff",
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              type: "time",
              scaleLabel: {
                display: true,
                labelString: "Time",
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: "Temperature (°C)",
              },
            },
          ],
        },
      },
    });
  }

  render() {
    return (
      <div>
        <canvas id="myChart" ref={this.chartRef} height="200"></canvas>
      </div>
    );
  }
}
