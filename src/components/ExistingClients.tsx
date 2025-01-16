import React, { useState } from "react";
import { ClientCreationDetails } from "./ClientCreationDetails";
import { Client } from "../types/Client";

const ParentComponent = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const addClient = (client: Client) => {
    setClients([...clients, client]);
  };

  return (
    <div>
      <ClientCreationDetails onAdd={addClient} existingClients={clients} />
      {/* Render the client list or other components */}
    </div>
  );
};

export default ParentComponent;
