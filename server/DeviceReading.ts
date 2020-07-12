export interface IDeviceReading {
  PartitionKey: Date;
  RowKey: string;
  Timestamp: string;
  Device: string;
  Temperature: string;
}
