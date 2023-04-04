import React from 'react';
import '../../scss/FilterColumns.scss';

export const FilterColumns = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span>
      <input
        className="search-input"
        placeholder="Search"
        value={filterValue || ``}
        onChange={(e) => setFilter(e.target.value)} />
    </span>
  );
};
