import React, {ReactElement, useState} from "react";
import {Client} from "../types/Client.ts";
import {ClientTable} from "./ClientTable.tsx";
import {ClientCreationDetails} from "./ClientCreationDetails.tsx";
import {Login} from "./Login.tsx";
import {Button} from "@mui/material";
import {Typography} from "@mui/joy";

type Props = {
  initialClients?: Client[];
};

export const ClientPage = ({ initialClients }: Props): ReactElement => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [clients, setClients] = useState<Client[]>(initialClients ?? []);

  if (!loggedInUser) {
    return (
      <Login
        loginSuccess={(name: string) => {
          setLoggedInUser(name);
        }}
      />
    );
  }

  const addClient = (newClient: Client) => {
    setClients(clients.concat(newClient));
  };

  const deleteClient = (id: string): void => {
    setClients(clients.filter((client) => client.id !== id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "400px" }}>
      <Typography level={"h1"}>Clients</Typography>
      <Typography level={"h2"}>Welcome {loggedInUser}</Typography>
      <ClientCreationDetails onAdd={(newClient: Client) => addClient(newClient)} />

      <Typography level={"h3"}>Client table:</Typography>

      <ClientTable clients={clients} onDelete={(id: string) => deleteClient(id)} />
      <Button color="error" variant="outlined" onClick={() => setLoggedInUser(null)}>
        Log out
      </Button>
    </div>
  );
};
