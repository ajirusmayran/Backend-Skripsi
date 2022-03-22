export interface TrackingDetailDto {
  id: string;
  username?: string;
  address: string;
  createdTm: Date;
  status?: "active" | "done" | "pending";
}
