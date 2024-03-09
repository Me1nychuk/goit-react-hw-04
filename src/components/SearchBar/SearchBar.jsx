import toast, { Toaster } from "react-hot-toast";
import PropTypes from "prop-types";
import css from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const newWord = e.currentTarget.elements.searchWord.value.trim();
    if (newWord !== "") {
      onSubmit(newWord);
      e.currentTarget.reset();
      toast.success("You have entered the correct data", {
        position: "top-right",
      });
    } else {
      toast.error("Oops, you have to enter some text.", {
        position: "top-right",
      });
    }
  };
  return (
    <header className={css.SearchBar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search images and photos"
          name="searchWord"
          className={css.input}
        />
        <button type="submit" className={css.btn}>
          Search
        </button>
        <Toaster />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
