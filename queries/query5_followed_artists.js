// ============================================================
// QUERY 5 – Find All Artists Followed by a Specific User
// Find the full artist documents for every artist followed
// by user "rnguyen" (user_id: 5), who follows all 4 artists.
// Uses $lookup to join users.followed_artists with artists.
// ============================================================

db.users.aggregate([
    {
      $match: { username: "rnguyen" }
    },
    {
      $lookup: {
        from: "artists",
        localField: "followed_artists",
        foreignField: "artist_id",
        as: "followed_artist_details"
      }
    },
    {
      $project: {
        _id: 0,
        username: 1,
        followed_artist_details: {
          artist_id: 1,
          name: 1,
          genre: 1
        }
      }
    }
  ]);
  
  // Expected output:
  // {
  //   username: "rnguyen",
  //   followed_artist_details: [
  //     { artist_id: 1, name: "Phoebe Bridgers",   genre: "Indie Folk"      },
  //     { artist_id: 2, name: "Mitski",             genre: "Indie Rock"      },
  //     { artist_id: 3, name: "Khruangbin",         genre: "Psychedelic Soul" },
  //     { artist_id: 4, name: "Japanese Breakfast", genre: "Indie Pop"       }
  //   ]
  // }