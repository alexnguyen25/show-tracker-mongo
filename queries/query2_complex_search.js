// ============================================================
// QUERY 2 – Complex Search
// Find all shows at venues in San Francisco OR Washington DC
// where the ticket price is less than $50.
// Uses $lookup to join shows with venues, $or and $and logical
// connectors for the search criterion.
// ============================================================

db.shows.aggregate([
  {
    $lookup: {
      from: "venues",
      localField: "venue_id",
      foreignField: "venue_id",
      as: "venue"
    }
  },
  {
    $unwind: "$venue"
  },
  {
    $match: {
      $and: [
        {
          $or: [
            { "venue.city": "San Francisco" },
            { "venue.city": "Washington" }
          ]
        },
        { ticketPrice: { $lt: 50 } }
      ]
    }
  },
  {
    $project: {
      _id: 0,
      show_id: 1,
      date: 1,
      ticketPrice: 1,
      "venue.name": 1,
      "venue.city": 1
    }
  }
]);

// Expected output:
// { show_id: 1, date: "2025-03-15", ticketPrice: 45, venue: { name: "The Fillmore",  city: "San Francisco" } }
// { show_id: 3, date: "2025-06-20", ticketPrice: 40, venue: { name: "9:30 Club",     city: "Washington"   } }
// { show_id: 6, date: "2025-09-05", ticketPrice: 35, venue: { name: "9:30 Club",     city: "Washington"   } }