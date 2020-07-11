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
    //const scaleColor = "#cccccc";
    const scaleColor = "#666";
    const deskSeriesColor = "rgb(52, 152, 219)";
    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Desk",
            fill: false,
            data: data,
            backgroundColor: deskSeriesColor,
            borderColor: deskSeriesColor,
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
                fontColor: scaleColor,
              },
              ticks: {
                fontColor: scaleColor,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: scaleColor,
              },
              scaleLabel: {
                display: true,
                labelString: "Temperature (°C)",
                fontColor: scaleColor,
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
