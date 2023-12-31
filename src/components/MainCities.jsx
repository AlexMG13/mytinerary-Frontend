import React from "react";
import SearchCity from "./SearchCity";
import AllCities from "./AllCities";
import Hero from "./Hero";

export default function MainCities() {
  return (
    <div>
      <div className="h-screen">
        <Hero />
        <SearchCity />
      </div>
      <div className="md:h-[50%] lg:h-screen">
        <AllCities />
      </div>
    </div>
  );
}
