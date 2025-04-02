import React, { useState } from 'react';
import { useContext } from "react";
import { ProfileContext } from '../Context/ProfileContext';
import Loading from '../Components/Loading';
import ProfileCard from '../Components/ProfileCard';
import Map from "../Components/MapComponent";
import styles from "../Styles/Home.module.css";

function Home() {
    const { profiles, loading, error } = useContext(ProfileContext);
    const [selectedProfile, setSelectedProfile] = useState(null);

    if (loading) return <Loading />;
    if (error) return <div>Error loading profiles</div>;

    return (
        <div className={styles.container}>
            {/* Profile List Section */}
            <div className={styles.profileList}>
                {profiles.map((profile) => (
                    <ProfileCard 
                        key={profile.login.uuid} 
                        profile={profile} 
                        onSelect={setSelectedProfile} 
                    />
                ))}
            </div>

            
            <div className={styles.mapContainer}>
                {selectedProfile?.location?.coordinates ? (
                    <Map selectedProfile={selectedProfile} />
                ) : (
                    <h3 style={{ textAlign: "center", padding: "20px" }}>
                        🗺️ Select a profile to view on the map
                    </h3>
                )}
            </div>
        </div>
    );
}

export default Home;
