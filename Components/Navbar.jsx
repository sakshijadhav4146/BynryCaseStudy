import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Navbar.module.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/" style={{ textDecoration: "none", color: "white"}}>Profile Explorer</Link>
      </div>

      <div className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.show : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li>
          <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
        </li>
        
      </ul>
    </nav>
  );
}

export default Navbar;
