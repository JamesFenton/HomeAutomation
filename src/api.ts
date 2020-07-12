import axios from "axios";
import { IDeviceReading } from "../server/DeviceReading";

export function getTemperatures(from?: string) {
  let url = "/api/readings";
  if (from) url += `?from=${encodeURIComponent(from)}`;

  return axios.get(url).then((r) => r.data as IDeviceReading[]);
}
