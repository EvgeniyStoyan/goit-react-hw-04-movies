import React from "react";
import s from "./MoviesPageForm.module.css";

const MoviesPageForm = ({ handleSubmit, handleQueryChange, inputValue }) => {
  return (
    <form className={s.SearchForm} onSubmit={handleSubmit}>
      <input
        className={s.SearchFormInput}
        type="text"
        autocomplete="off"
        autofocus
        placeholder="Search movie"
        name="searchQuery"
        value={inputValue}
        onChange={handleQueryChange}
      />

      <button type="submit" className={s.SearchFormButton}>
        <span className={s.SearchFormButtonLabel}>Search</span>
      </button>
    </form>
  );
};

export default MoviesPageForm;
