import React from "react";
import {Client} from "../types/Client.ts";
import {ClientRow} from "./ClientRow.tsx";
import {Table} from "@mui/joy";

type Props = {
  clients: Client[];
  onDelete: (id: string) => void;
};

export const ClientTable = ({ clients, onDelete }: Props) => {
  if (clients.length == 0) {
    return <></>;
  }
  const clientElements = clients.map((client) => (
    <ClientRow client={client} key={`client-${client.id}`} onDelete={() => onDelete(client.id)} />
  ));
  return (
    <div>
      <Table aria-label={"Client table"} variant="soft">
        <thead>
        <tr>
          <th style={{ width: "40%" }}>Name</th>
          <th>Status</th>
          <th style={{ width: "12%" }}>Delete</th>
        </tr>
        </thead>
        <tbody>
        {clientElements}
        </tbody>
      </Table>
    </div>
  );
};
