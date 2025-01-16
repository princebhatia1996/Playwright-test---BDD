export type ClientStatus = "active" | "inactive";

export type Client = {
  id: string;
  name: string;
  status: ClientStatus;
};
