import type { SubmitEventHandler } from "react";

type LoginFormProps = {
  username: string;
  onUsernameChange: (username: string) => void;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
  onLogout: () => void;
  loading: boolean;
};

const LoginForm = ({
  username,
  onUsernameChange,
  onSubmit,
  onLogout,
  loading,
}: LoginFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => onUsernameChange(e.target.value)}
      />
      <button type="submit">Log In</button>
      <button type="button" onClick={onLogout} disabled={loading}>
        Log Out
      </button>
    </form>
  );
};

export default LoginForm;
