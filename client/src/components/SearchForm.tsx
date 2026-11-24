import type { SubmitEventHandler } from "react";
import "../App.css";

type SearchFormProps = {
  title: string;
  onChangeTitle: (title: string) => void;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
  onClear: () => Promise<void>;
  loading: boolean;
};

const SearchForm = ({ title, onChangeTitle, onSubmit, onClear, loading }: SearchFormProps) => {
  return (
    <form
      onSubmit={(e) => {
        if (!title.trim() || loading) {
          e.preventDefault();
          return;
        }
        return onSubmit(e);
      }}
      className="searchConntent"
    >
      <input
        type="text"
        placeholder="Search"
        value={title}
        onChange={(e) => onChangeTitle(e.target.value)}
      />
      <button type="submit" disabled={loading || !title.trim()}>
        Search
      </button>
      <button type="button" onClick={onClear} disabled={loading}>
        Clear search
      </button>
    </form>
  );
};

export default SearchForm;
