import React from "react";

type Filters = { searchTerm: string; myTask: boolean; openTask: boolean };

interface FilterState {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export const FilterContext = React.createContext<FilterState>({} as any);

export const FilterProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<Filters>({
    searchTerm: "",
    myTask: false,
    openTask: false,
  });
  const value: FilterState = { filters: state, setFilters: setState };
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = React.useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
};
