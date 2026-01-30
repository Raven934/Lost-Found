import React, { useState } from "react";
import Hero from "./componants/Hero";
import Items from "./componants/items";
import Filter from "./componants/filter";

export default function Home() {
  const [typeFilter, setTypeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'type') {
      setTypeFilter(value);
    } else if (filterType === 'location') {
      setLocationFilter(value);
    }
  };

  return (
    <div>
      <Hero />
      <Filter onFilterChange={handleFilterChange} />
      <Items typeFilter={typeFilter} locationFilter={locationFilter} />
    </div>
  );
}
