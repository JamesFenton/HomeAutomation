const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/readings", (req, res) => {
  const readings = [
    {
      timestamp: "2020-07-13T12:34:11.567Z",
      device: "T1",
      value: 18.71,
    },
    {
      timestamp: "2020-07-13T12:19:07.488Z",
      device: "T1",
      value: 18.71,
    },
    {
      timestamp: "2020-07-13T12:04:03.428Z",
      device: "T1",
      value: 19.35,
    },
    {
      timestamp: "2020-07-13T11:48:59.177Z",
      device: "T1",
      value: 19.35,
    },
    {
      timestamp: "2020-07-13T11:33:54.900Z",
      device: "T1",
      value: 19.35,
    },
    {
      timestamp: "2020-07-13T11:18:51.043Z",
      device: "T1",
      value: 18.39,
    },
    {
      timestamp: "2020-07-13T11:03:47.110Z",
      device: "T1",
      value: 18.39,
    },
  ];
  setTimeout(() => res.send(readings), 2000);
});

// run
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
