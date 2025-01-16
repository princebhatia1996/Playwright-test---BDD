import "./App.css";
import React, { ReactElement } from "react";
import { ClientPage } from "./components/ClientPage.tsx";
import { nanoid } from "nanoid";
import { Client } from "./types/Client.ts";
import { Typography } from "@mui/joy";

const initialClients: Client[] = [
  { id: nanoid(), name: "Homer Simpson", status: "active" },
  { id: nanoid(), name: "Moe Szyslak", status: "active" },
];

export const App = (): ReactElement => {
  return (
    <>
      <Typography level="body-md" className="your-name">
        <strong>Instruction: </strong>
        Prince Bhatia.
      </Typography>

      <div style={{ padding: "8px" }}>
        <ClientPage initialClients={initialClients} />
      </div>
    </>
  );
};
