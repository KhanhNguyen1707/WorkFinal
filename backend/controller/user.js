// backend/user.js
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../db");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");

passport.use(
  new GoogleStrategy(
    {
      clientID: "clientID",
      clientSecret: "clientSecret",
      callbackURL: "http://localhost:5000/users/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        const sql = "SELECT * FROM users WHERE GoogleID = ?";
        db.query(sql, [profile.id], (err, results) => {
          if (err) return done(err);

          if (results.length > 0) {
            return done(null, results[0]);
          } else {
            // New user, add to database
            const insertSql =
              "INSERT INTO users (GoogleID, Name, Email, Role) VALUES (?, ?, ?, 'user')";
            db.query(
              insertSql,
              [profile.id, profile.displayName, profile.emails[0].value],
              (insertErr, insertResults) => {
                if (insertErr) return done(insertErr);
                return done(null, { ID: insertResults.insertId, ...profile });
              }
            );
          }
        });
      } catch (error) {
        done(error);
      }
    }
  )
);

// Serialize and Deserialize User
passport.serializeUser((user, done) => done(null, user.ID));
passport.deserializeUser((id, done) => {
  db.query("SELECT * FROM users WHERE ID = ?", [id], (err, results) => {
    done(err, results[0]);
  });
});

// Google OAuth Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    if (req.user) {
      const user = {
        ID: req.user.ID,
        Name: req.user.Name,
        Email: req.user.Email,
        Role: req.user.Role,
      };
      res.redirect(
        `http://localhost:3000/login?user=${encodeURIComponent(
          JSON.stringify(user)
        )}`
      );
    } else {
      res.redirect("/login");
    }
  }
);

// Logout Route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send(err);
    res.redirect("/");
  });
});

// Check if email exists in the database
router.post("/email-exists", (req, res) => {
  const { Email } = req.body;

  const sql = "SELECT * FROM users WHERE Email = ?";
  db.query(sql, [Email], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Error checking email" });
    }

    if (results.length > 0) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  });
});

// Register Route
router.post("/register", (req, res) => {
  const { Name, Email, Password, Address, Phone, Role } = req.body;

  bcrypt.hash(Password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    const sql =
      "INSERT INTO users (Name, Email, PasswordHash, Address, Phone, Role) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [Name, Email, hash, Address, Phone, Role],
      (error, results) => {
        if (error) {
          return res.status(500).json({ message: "Error creating user" });
        }
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
});

// Login Route
router.post("/login", (req, res) => {
  const { Email, Password } = req.body;

  const sql = "SELECT * FROM users WHERE Email = ?";
  db.query(sql, [Email], (error, results) => {
    if (error || results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];

    bcrypt.compare(Password, user.PasswordHash, (err, match) => {
      if (err || !match) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Successfully logged in
      res.status(200).json({
        message: "Login successful",
        user: {
          ID: user.ID,
          Name: user.Name,
          Email: user.Email,
          Role: user.Role,
        },
      });
    });
  });
});

module.exports = router;
