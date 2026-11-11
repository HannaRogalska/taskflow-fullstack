import type { SubmitEventHandler } from "react";
import "../App.css";

type SearchFormProps = {
  title: string;
  onChangeTitle: (title: string) => void;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
};

const SearchForm = ({ title, onChangeTitle, onSubmit }: SearchFormProps) => {
  return (
    <form onSubmit={onSubmit} className="searchConntent">
      <input
        type="text"
        placeholder="Search"
        value={title}
        onChange={(e) => onChangeTitle(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
