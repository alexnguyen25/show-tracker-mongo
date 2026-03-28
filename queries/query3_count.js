// ============================================================
// QUERY 3 – Count Documents for a Specific User
// Count the total number of shows attended by user "mwilliams"
// (user_id: 3), who has the most attendance records.
// ============================================================

db.users.aggregate([
  {
    $match: { username: "mwilliams" }
  },
  {
    $project: {
      _id: 0,
      username: 1,
      total_shows_attended: { $size: "$attendance" }
    }
  }
]);

// Expected output:
// { username: "mwilliams", total_shows_attended: 4 }