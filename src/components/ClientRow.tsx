import React from "react";
import {Client} from "../types/Client.ts";
import {IconButton} from "@mui/joy";
import {Delete} from "@mui/icons-material";

type Props = {
  client: Client;
  onDelete: (id: string) => void;
};

export function ClientRow({ client, onDelete }: Props) {
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.status}</td>
      <td>
        <IconButton variant="outlined" color="danger" onClick={() => onDelete(client.id)}>
          <Delete />
        </IconButton>
      </td>
    </tr>
  );
}
