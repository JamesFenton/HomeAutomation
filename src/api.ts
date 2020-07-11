import axios from "axios";
import _ from "lodash";

export interface TemperatureReading {
  timestamp: string;
  device: string;
  temperature: number;
}

export function getTemperatures() {
  return axios.get("https://prod-22.southafricanorth.logic.azure.com:443/workflows/30ab1bae2e4542308eb880cffed4a4d9/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=L3fwUsX3zLDhx3o2cjISMc8cqMYbQVlx2s2oWPvg6nU")
    .then(r => {
      const data = (r.data as any[]).map(convertData);
      return _.orderBy(data, x => x.timestamp, 'desc')
    });
}

function convertData(dto) {
  return <TemperatureReading>{
    timestamp: dto["Timestamp"],
    device: dto["Device"],
    temperature: dto["Temperature"]
  }
}