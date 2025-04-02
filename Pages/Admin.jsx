import React, { useState, useContext } from "react";
import { ProfileContext } from "../Context/ProfileContext";
import styles from "../Styles/Admin.module.css";

function Admin() {
  const { profiles, addProfile, editProfile, deleteProfile } = useContext(ProfileContext);
  const [formData, setFormData] = useState({ first: "", last: "", country: "", picture: "" });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      editProfile(editingId, {
        id: editingId, // Ensure ID persists while editing
        name: { first: formData.first, last: formData.last },
        location: { country: formData.country },
        picture: { medium: formData.picture }
      });
      setEditingId(null);
    } else {
      addProfile({
        id: crypto.randomUUID(), // Generate a unique string-based ID
        name: { first: formData.first, last: formData.last },
        location: { country: formData.country },
        picture: { medium: formData.picture }
      });
    }
    setFormData({ first: "", last: "", country: "", picture: "" });
  };

  const handleEdit = (profile) => {
    setEditingId(profile.id);
    setFormData({
      first: profile.name.first,
      last: profile.name.last,
      country: profile.location.country,
      picture: profile.picture.medium
    });
  };

  return (
    <div className={styles.adminContainer}>
      <h2>Admin Panel - Profile Management</h2>

      <form onSubmit={handleSubmit} className={styles.profileForm}>
        <input type="text" name="first" value={formData.first} onChange={handleChange} placeholder="First Name" required />
        <input type="text" name="last" value={formData.last} onChange={handleChange} placeholder="Last Name" required />
        <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" required />
        <input type="text" name="picture" value={formData.picture} onChange={handleChange} placeholder="Profile Image URL" required />
        <button type="submit">{editingId ? "Update Profile" : "Add Profile"}</button>
      </form>

      <div className={styles.profileList}>
        {profiles.map((profile) => (
          <div key={profile.id} className={styles.profileCard}>
            <img src={profile.picture.medium} alt={`${profile.name.first} ${profile.name.last}`} />
            <h3>{profile.name.first} {profile.name.last}</h3>
            <p>{profile.location.country}</p>
            <button onClick={() => handleEdit(profile)}>Edit</button>
            <button onClick={() => deleteProfile(profile.id)} className={styles.deleteButton}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
