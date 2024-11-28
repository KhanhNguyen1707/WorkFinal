// src/components/NotFound.js
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404</h1>
      <p style={styles.message}>
        Sorry, the page you're looking for doesn't exist.
      </p>
      <a href="/">Back to Home page!</a>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f4f4f4",
  },
  header: {
    fontSize: "100px",
    margin: "0",
  },
  message: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  link: {
    fontSize: "18px",
    color: "#007bff",
    textDecoration: "none",
  },
};

export default NotFound;
