import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";

import Chip from "@material-ui/core/Chip";
import { useFilters } from "./FilterContext";

const FilterControls = () => {
  const { filters, setFilters } = useFilters();
  return (
    <div
      style={{ padding: "12px 12px 6px", background: "rgba(255,255,255,0.5)" }}
    >
      <TextField
        value={filters.searchTerm}
        onChange={(ev) =>
          setFilters({
            ...filters,
            searchTerm: ev.target.value,
          })
        }
        style={{ width: "100%" }}
        id="outlined-search"
        label="Search"
        type="search"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <div style={{ marginTop: 6 }}>
        <Chip
          avatar={<FilterListIcon />}
          label="My Tasks"
          onClick={() => {
            setFilters({
              ...filters,
              myTask: !filters.myTask,
            });
          }}
          color={filters.myTask ? "secondary" : undefined}
        />
        <Chip
          avatar={<FilterListIcon />}
          label="Open Tasks"
          onClick={() => {
            setFilters({
              ...filters,
              openTask: !filters.openTask,
            });
          }}
          color={filters.openTask ? "secondary" : undefined}
        />
      </div>
    </div>
  );
};

export default FilterControls;
