import { NowRequest, NowResponse } from "@vercel/node";
import moment from "moment";
import azure from "azure-storage";
import db from "../server/db";
import { IDeviceReading } from "../server/DeviceReading";

export default function (req: NowRequest, res: NowResponse) {
  const days = parseInt((req.query.from as string) || "30");
  const from = moment().subtract(days, "days").toISOString();

  const query = new azure.TableQuery().top(1000).where("Timestamp gt ?", from);

  db.queryEntities("temperature", query, null, function (
    error,
    result,
    response
  ) {
    if (error) {
      console.error(error);
      return res.send("Unexpected error occurred");
    }

    res.send(result.entries);
  });
}
