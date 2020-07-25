import React from "react";
import { ChartData, ChartOptions } from "chart.js";
import { IDeviceReading } from "../server/DeviceReading";
import Spinner from "react-bootstrap/Spinner";
import { Line } from "react-chartjs-2";

export default function ({ readings }: { readings: IDeviceReading[] }) {
  const data = readings.map((r) => {
    return { x: new Date(r.timestamp), y: r.value };
  });

  //const scaleColor = "#cccccc";
  const scaleColor = "#666";
  const deskSeriesColor = "rgb(52, 152, 219)";

  const chartData: ChartData = {
    datasets: [
      {
        label: "Desk",
        fill: false,
        data: data,
        backgroundColor: deskSeriesColor,
        borderColor: deskSeriesColor,
      },
    ],
  };

  const chartOptions: ChartOptions = {
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
  };

  const isLoaded = readings && readings.length > 0;
  if (!isLoaded)
    return (
      <div className="text-center">
        <Spinner animation="border" variant="light" />
      </div>
    );

  return <Line data={chartData} options={chartOptions} height={220} />;
}
