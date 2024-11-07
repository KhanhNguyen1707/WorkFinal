const express = require("express");
const db = require("../db");
const router = express.Router();

// Get books with sorting, searching, category filtering, and pagination
router.get("/books", (req, res) => {
  let { sortBy, search, category, page = 1, limit = 9 } = req.query;
  let offset = (page - 1) * limit;

  let sql = "SELECT * FROM books";
  let countSql = "SELECT COUNT(*) as totalCount FROM books";

  // Search condition
  if (search) {
    sql += ` WHERE Title LIKE '%${search}%'`;
    countSql += ` WHERE Title LIKE '%${search}%'`;
  }

  // Category filter
  if (category) {
    sql += search
      ? ` AND GenreID = ${category}`
      : ` WHERE GenreID = ${category}`;
    countSql += search
      ? ` AND GenreID = ${category}`
      : ` WHERE GenreID = ${category}`;
  }

  // Sorting condition
  switch (sortBy) {
    case "priceHighLow":
      sql += " ORDER BY Price DESC";
      break;
    case "priceLowHigh":
      sql += " ORDER BY Price ASC";
      break;
    case "dateOldNew":
      sql += " ORDER BY ReleaseDate ASC";
      break;
    case "dateNewOld":
      sql += " ORDER BY ReleaseDate DESC";
      break;
    default:
      break;
  }

  // Pagination
  sql += ` LIMIT ${limit} OFFSET ${offset}`;

  // Queries
  db.query(sql, (err, books) => {
    if (err) throw err;

    // Total number of records for pagination
    db.query(countSql, (err, countResult) => {
      if (err) throw err;
      const totalCount = countResult[0].totalCount;
      const totalPages = Math.ceil(totalCount / limit);

      res.json({ books, totalPages });
    });
  });
});

// Route to get all categories (from the 'genres' table)
router.get("/categories", (req, res) => {
  let sql = "SELECT * FROM genres";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = router;
