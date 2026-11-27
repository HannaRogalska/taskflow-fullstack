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
    <form
      onSubmit={(e) => {
        if (!username.trim() || loading) {
          e.preventDefault();
          return;
        }
        return onSubmit(e);
      }}
    >
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        disabled={loading}
        onChange={(e) => onUsernameChange(e.target.value)}
      />
      <button type="submit" disabled={loading || !username.trim()}>
        Log In
      </button>
      <button type="button" onClick={onLogout} disabled={loading}>
        Log Out
      </button>
    </form>
  );
};

export default LoginForm;
