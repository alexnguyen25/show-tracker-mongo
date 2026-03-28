// ============================================================
// QUERY 1 – Aggregation Pipeline
// Count the number of shows attended per user, sorted by
// most attended. Uses $project and $sort stages.
// ============================================================

db.users.aggregate([
  {
    $project: {
      _id: 0,
      username: 1,
      shows_attended: { $size: "$attendance" }
    }
  },
  {
    $sort: { shows_attended: -1 }
  }
]);

// Expected output:
// { username: "rnguyen",    shows_attended: 5 }
// { username: "mwilliams", shows_attended: 4 }
// { username: "alexn",     shows_attended: 3 }
// { username: "jsmith",    shows_attended: 2 }
// { username: "tlee",      shows_attended: 2 }