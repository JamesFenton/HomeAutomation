import { NowRequest, NowResponse } from "@vercel/node";
import moment from "moment";
import azure from "azure-storage";
import _ from "lodash";
import db from "../server/db";
import { IDeviceReading } from "../server/DeviceReading";

export default function (req: NowRequest, res: NowResponse) {
  const days = parseInt((req.query.from as string) || "30");
  const from = moment().subtract(days, "days").toDate();

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

    const dtos = _(result.entries)
      .map(convertTableEntityToDto)
      .orderBy((x) => x.timestamp, "desc")
      .value();
    res.send(dtos);
  });
}

function convertTableEntityToDto(entity) {
  const dto: IDeviceReading = {
    timestamp: entity.Timestamp._,
    device: entity.Device._,
    value: entity.Temperature._,
  };
  return dto;
}
