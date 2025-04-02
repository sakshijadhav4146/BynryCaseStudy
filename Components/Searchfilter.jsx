import React, { useState, useContext } from "react";
import { ProfileContext } from "../Context/ProfileContext";
import styles from "../Styles/SearchFilter.module.css";

function SearchFilter() {
  const { profiles } = useContext(ProfileContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);

  const countries = [...new Set(profiles.map((profile) => profile.location.country))];


  const handleSearch = () => {
    console.log("Searching with:", searchTerm, selectedCountry); 
    const filtered = profiles.filter((profile) => {
      const firstNameMatch = profile.name.first.toLowerCase().includes(searchTerm.toLowerCase());
      const lastNameMatch = profile.name.last.toLowerCase().includes(searchTerm.toLowerCase());
      const countryMatch = selectedCountry === "" || profile.location.country === selectedCountry;

      return (firstNameMatch || lastNameMatch) && countryMatch;
    });

    console.log("Filtered Profiles:", filtered);
    setFilteredProfiles(filtered);
  };

  return (
    <div className={styles.filterContainer}>
     
      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className={styles.filterDropdown}
        >
          <option value="">All Countries</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>

        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>

      <p className={styles.resultCount}>
        Showing {filteredProfiles.length} results
      </p>

      <div className={styles.profileGrid}>
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <div key={profile.id} className={styles.profileCard}>
              <img src={profile.picture.medium} alt={`${profile.name.first} ${profile.name.last}`} />
              <h3>{profile.name.first} {profile.name.last}</h3>
              <p>{profile.location.country}</p>
            </div>
          ))
        ) : (
          <p className={styles.noResults}></p>
        )}
      </div>
    </div>
  );
}

export default SearchFilter;
