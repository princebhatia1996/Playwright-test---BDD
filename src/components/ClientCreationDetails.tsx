import React, { useState } from "react";
import { Client, ClientStatus } from "../types/Client";
import { nanoid } from "nanoid";
import { Button, TextField } from "@mui/material";
import { Option, Select, Typography } from "@mui/joy";

type Props = {
  onAdd: (client: Client) => void;
  existingClients?: Client[];
};

export const ClientCreationDetails = ({ onAdd, existingClients }: Props) => {
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<ClientStatus>("active");
  const [error, setError] = useState<string>("");

  const addClient = () => {
    console.log("Add client button clicked");
    if (name.trim() === "") {
      setError("Client name is required");
      return;
    }

    if (existingClients?.some((client) => client.name === name)) {
      setError("Client name already exists");
      return;
    }

    if (/[^a-zA-Z0-9 ]/.test(name)) {
      setError("Client name contains invalid characters");
      return;
    }

    if (name.length > 50) {
      setError("Client name is too long");
      return;
    }

    const newClient: Client = {
      id: nanoid(),
      name,
      status,
    };

    console.log("Adding client:", newClient);
    onAdd(newClient);
    setName("");
    setStatus("active");
    setError("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      <Typography level={"h3"}>Add client:</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "4px",
        }}
      >
        <TextField
          style={{ flex: 1 }}
          type="text"
          name="Client name"
          placeholder="Client name"
          onChange={(event) => {
            setName(event.target.value);
            setError("");
          }}
          value={name}
        />
        <Select
          onChange={(_, value) => {
            setStatus(value as ClientStatus);
            setError("");
          }}
          value={status}
        >
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      </div>
      <Button variant="contained" onClick={addClient}>
        Add client
      </Button>
      {error && (
        <div role="alert" style={{ color: "red", fontWeight: "bold" }}>
          {error}
        </div>
      )}
    </div>
  );
};
