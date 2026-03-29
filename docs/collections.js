// ============================================================
// ShowTracker – MongoDB Collection Definitions
// 2 example documents per collection
// ============================================================


// ============================================================
// COLLECTION: users
// Root collection. Attendance history is embedded because it
// belongs exclusively to one user and is always queried in
// the context of that user. followed_artists stores artist_id
// references since artists are a separate root collection
// shared across many users.
// ============================================================

db.users.insertMany([
    {
      user_id: 1,
      username: "alexn",
      email: "alex@example.com",
      password: "hashed_password_123",
      followed_artists: [1, 3],        // array of artist_id references
      attendance: [                     // embedded array — owned by this user
        {
          attendance_id: 1,
          show_id: 1,                   // reference to shows collection
          date: "2025-03-15",
          rating: 5,
          review: "Incredible set, Phoebe played Motion Sickness!"
        },
        {
          attendance_id: 2,
          show_id: 3,
          date: "2025-06-20",
          rating: 4,
          review: "Great vibes, Khruangbin was hypnotic."
        }
      ]
    },
    {
      user_id: 2,
      username: "jsmith",
      email: "jsmith@example.com",
      password: "hashed_password_456",
      followed_artists: [2],            // follows only Mitski
      attendance: [                     // user has attended one show so far
        {
          attendance_id: 3,
          show_id: 2,
          date: "2025-04-10",
          rating: 5,
          review: "Mitski was transcendent. Cried twice."
        }
      ]
    }
  ]);
  
  
  // ============================================================
  // COLLECTION: shows
  // Root collection. Setlist entries are embedded because they
  // belong to exactly one show and are always displayed with it.
  // venue_id and artists[] are references since venues and
  // artists are independent root collections shared across shows.
  // ============================================================
  
  db.shows.insertMany([
    {
      show_id: 1,
      date: "2025-03-15",
      ticketPrice: 45.00,
      venue_id: 1,                      // reference to venues collection
      artists: [1],                     // array of artist_id references
      setlist: [                        // embedded array — owned by this show
        {
          setlist_id: 1,
          order: 1,
          song_id: 1,
          song_title: "Motion Sickness",
          artist_id: 1
        },
        {
          setlist_id: 2,
          order: 2,
          song_id: 2,
          song_title: "Savior Complex",
          artist_id: 1
        }
      ]
    },
    {
      show_id: 2,
      date: "2025-04-10",
      ticketPrice: 55.00,
      venue_id: 2,                      // reference to venues collection
      artists: [2],                     // array of artist_id references
      setlist: [
        {
          setlist_id: 3,
          order: 1,
          song_id: 3,
          song_title: "Nobody",
          artist_id: 2
        },
        {
          setlist_id: 4,
          order: 2,
          song_id: 4,
          song_title: "Washing Machine Heart",
          artist_id: 2
        }
      ]
    }
  ]);
  
  
  // ============================================================
  // COLLECTION: artists
  // Root collection. Songs are embedded because a song belongs
  // to exactly one artist and is always retrieved in the context
  // of that artist. isActive allows songs to be toggled
  // on/off without deleting them (used in Query 4).
  // ============================================================
  
  db.artists.insertMany([
    {
      artist_id: 1,
      name: "Phoebe Bridgers",
      genre: "Indie Folk",
      biography: "LA-based singer-songwriter known for emotionally raw indie folk.",
      songs: [                          // embedded array — owned by this artist
        {
          song_id: 1,
          title: "Motion Sickness",
          isActive: true                // toggleable — see Query 4
        },
        {
          song_id: 2,
          title: "Savior Complex",
          isActive: true
        },
        {
          song_id: 5,
          title: "Funeral",
          isActive: false               // disabled song — excluded from setlists
        }
      ]
    },
    {
      artist_id: 2,
      name: "Mitski",
      genre: "Indie Rock",
      biography: "Japanese-American musician known for intense, confessional indie rock.",
      songs: [
        {
          song_id: 3,
          title: "Nobody",
          isActive: true
        },
        {
          song_id: 4,
          title: "Washing Machine Heart",
          isActive: true
        }
      ]
    }
  ]);
  
  
  // ============================================================
  // COLLECTION: venues
  // Root collection. No embeddings — venue data is self-contained
  // and queried independently for discovery (e.g. find venues
  // by city). Many shows reference the same venue so embedding
  // venue data into every show would cause duplication.
  // ============================================================
  
  db.venues.insertMany([
    {
      venue_id: 1,
      name: "The Fillmore",
      city: "San Francisco",
      state: "CA",
      capacity: 1150,
      genreTags: ["Indie", "Rock", "Folk"]  // array of genre strings
    },
    {
      venue_id: 2,
      name: "Red Rocks Amphitheatre",
      city: "Morrison",
      state: "CO",
      capacity: 9525,
      genreTags: ["Rock", "Electronic", "Indie", "Country"]
    }
  ]);