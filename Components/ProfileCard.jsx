import React from "react";
import styles from "../Styles/ProfileCard.module.css"
import { Link } from "react-router-dom";
function ProfileCard({ profile, onSelect }) {
  return (
    <>
   
    <div className={styles.card}>
      <img src={profile.picture.large} alt=""  className={styles.image} />
      <Link to={`/profile/${profile.login.uuid}`} style={{ textDecoration: "none", color: "white"}}>
      <h2 className={styles.name}>
      <p><strong>Name: </strong>{profile.name.title}    {profile.name.first} {profile.name.last}</p>
      </h2>
      </Link>
      <p className={styles.info}><strong>Gender:</strong> {profile.gender}</p>
      <p className={styles.info}><strong>Email:</strong> {profile.email}</p>
      <p className={styles.info}><strong>Location:</strong> {profile.location.city} {profile.location.country}</p>
      <button onClick={() => onSelect(profile)}  className={styles.button}>
        View on Map 📍
      </button>
    </div>
    
    </>
    
  );
}



export default ProfileCard;
