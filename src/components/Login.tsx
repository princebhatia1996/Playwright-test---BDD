import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Typography from "@mui/joy/Typography";

const DEFAULT_DELAY = 1000;
const CORRECT_FAKE_PASSWORD = "findex";
type Props = {
  delay?: number;
  loginSuccess: (userName: string) => void;
};
const delayMillis = async (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

export const Login = ({ delay, loginSuccess }: Props) => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState<string>("Mike");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onSubmit = async () => {
    setLoading(true);
    await delayMillis(delay ?? DEFAULT_DELAY);
    if (userName.trim().length < 1) {
      setError(`User name is required - use any value for this.`);
    } else if (password !== CORRECT_FAKE_PASSWORD) {
      setError(`Password is incorrect - for the purposes of the demo, use the value "${CORRECT_FAKE_PASSWORD}"`);
    } else {
      loginSuccess(userName);
    }
    setLoading(false);
  };
  if (loading) {
    return <div role="progressbar">Loading...</div>;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "800px",
      }}
    >
      <Typography level="h1">Log in</Typography>
      <Typography level="body-md">This is a mock login page.</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          width: "400px",
        }}
      >
        <TextField
          type="text"
          variant="outlined"
          placeholder="User name (use any value)"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <TextField
          type="password"
          variant="outlined"
          placeholder={`Password (use "${CORRECT_FAKE_PASSWORD}")`}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button variant="contained" onClick={() => onSubmit()}>
          Log in
        </Button>
      </div>
      <div role="alert" style={{ color: "red", fontWeight: "bold" }}>
        {error}
      </div>
    </div>
  );
};
