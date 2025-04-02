import React, { useContext } from "react";
import { ProfileContext } from "../Context/ProfileContext";
import { useParams } from "react-router-dom";
import styles from "../Styles/ProfileDescription.module.css"; 


function ProfileDescription() {
  const { profiles, loading, error } = useContext(ProfileContext);
  const { id } = useParams();

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>Error loading profiles</p>;

  const profile = profiles.find((p) => p.login.uuid === id);
  if (!profile) return <p className={styles.notFound}>Profile not found</p>;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <img src={profile.picture.large} alt="Profile" className={styles.profileImage} />
        <h2 className={styles.profileName}>
          {profile.name.first} {profile.name.last}
        </h2>
        <h3 className={styles.sectionTitle}>Contact Information 📞</h3>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>

        <h3 className={styles.sectionTitle}>Address 📍</h3>
        <p>
          {profile.location.street.number} {profile.location.street.name}, 
          {profile.location.city}, {profile.location.state}, 
          {profile.location.country}
        </p>
       
      </div>
    </div>
  );
}

export default ProfileDescription;
