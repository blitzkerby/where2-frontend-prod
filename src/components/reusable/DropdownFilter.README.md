```javascript
// IMPORT COMPONENT
import DropdownFilter from '.../Dropdownfilter';

// YOUR DATA
const filters = 
    { category: "Nearby", 
      options: [
        {
          name : "University A",
          value: "A"
        },
        {
          name : "University B", 
          value: "B"
        }]};
  
  // DEFAULT SELECTION
  const defaultFilter = {
      name : "University B", 
      value: "B",
      sort: 'asc'
    };
  
  // YOUR CALLBACK FUNCTION
  const handleFilterChange = (selectedFilter) => {
    // TODO
  };


  // INSIDE YOUR JSX
  <DropdownFilter
  filterData={filters} 
  onFilterChange={handleFilterChange} 
  defaultSelectedFilter={defaultFilter}/>
  ```