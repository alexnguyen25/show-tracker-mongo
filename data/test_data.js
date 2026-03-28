// ============================================================
// ShowTracker – Test Data
// Run in Mongo Shell or import via MongoDB Compass
// ============================================================


// ============================================================
// COLLECTION: venues (4 venues across different cities)
// ============================================================

db.venues.insertMany([
    {
      venue_id: 1,
      name: "The Fillmore",
      city: "San Francisco",
      state: "CA",
      capacity: 1150,
      genreTags: ["Indie", "Rock", "Folk"]
    },
    {
      venue_id: 2,
      name: "Red Rocks Amphitheatre",
      city: "Morrison",
      state: "CO",
      capacity: 9525,
      genreTags: ["Rock", "Electronic", "Indie", "Country"]
    },
    {
      venue_id: 3,
      name: "9:30 Club",
      city: "Washington",
      state: "DC",
      capacity: 1200,
      genreTags: ["Indie", "Punk", "Alternative"]
    },
    {
      venue_id: 4,
      name: "Brooklyn Steel",
      city: "Brooklyn",
      state: "NY",
      capacity: 1800,
      genreTags: ["Indie", "Electronic", "Hip-Hop"]
    }
  ]);
  
  
  // ============================================================
  // COLLECTION: artists (4 artists with songs)
  // ============================================================
  
  db.artists.insertMany([
    {
      artist_id: 1,
      name: "Phoebe Bridgers",
      genre: "Indie Folk",
      biography: "LA-based singer-songwriter known for emotionally raw indie folk.",
      songs: [
        { song_id: 1, title: "Motion Sickness", isActive: true },
        { song_id: 2, title: "Savior Complex", isActive: true },
        { song_id: 3, title: "Funeral", isActive: false },
        { song_id: 4, title: "Moon Song", isActive: true }
      ]
    },
    {
      artist_id: 2,
      name: "Mitski",
      genre: "Indie Rock",
      biography: "Japanese-American musician known for intense, confessional indie rock.",
      songs: [
        { song_id: 5, title: "Nobody", isActive: true },
        { song_id: 6, title: "Washing Machine Heart", isActive: true },
        { song_id: 7, title: "Your Best American Girl", isActive: true },
        { song_id: 8, title: "Cop Car", isActive: false }
      ]
    },
    {
      artist_id: 3,
      name: "Khruangbin",
      genre: "Psychedelic Soul",
      biography: "Houston-based trio known for global groove and hypnotic instrumentals.",
      songs: [
        { song_id: 9,  title: "Time (You and I)", isActive: true },
        { song_id: 10, title: "Evan Finds the Third Room", isActive: true },
        { song_id: 11, title: "Lady and Man", isActive: true }
      ]
    },
    {
      artist_id: 4,
      name: "Japanese Breakfast",
      genre: "Indie Pop",
      biography: "Michelle Zauner's project blending indie pop with emotional storytelling.",
      songs: [
        { song_id: 12, title: "Paprika", isActive: true },
        { song_id: 13, title: "Be Sweet", isActive: true },
        { song_id: 14, title: "Essentially", isActive: false }
      ]
    }
  ]);
  
  
  // ============================================================
  // COLLECTION: shows (6 shows across different venues/genres)
  // ============================================================
  
  db.shows.insertMany([
    {
      show_id: 1,
      date: "2025-03-15",
      ticketPrice: 45.00,
      venue_id: 1,
      artists: [1],
      setlist: [
        { setlist_id: 1, order: 1, song_id: 1, song_title: "Motion Sickness",  artist_id: 1 },
        { setlist_id: 2, order: 2, song_id: 2, song_title: "Savior Complex",   artist_id: 1 },
        { setlist_id: 3, order: 3, song_id: 4, song_title: "Moon Song",        artist_id: 1 }
      ]
    },
    {
      show_id: 2,
      date: "2025-04-10",
      ticketPrice: 55.00,
      venue_id: 2,
      artists: [2],
      setlist: [
        { setlist_id: 4, order: 1, song_id: 5, song_title: "Nobody",                    artist_id: 2 },
        { setlist_id: 5, order: 2, song_id: 6, song_title: "Washing Machine Heart",     artist_id: 2 },
        { setlist_id: 6, order: 3, song_id: 7, song_title: "Your Best American Girl",   artist_id: 2 }
      ]
    },
    {
      show_id: 3,
      date: "2025-06-20",
      ticketPrice: 40.00,
      venue_id: 3,
      artists: [3],
      setlist: [
        { setlist_id: 7,  order: 1, song_id: 9,  song_title: "Time (You and I)",          artist_id: 3 },
        { setlist_id: 8,  order: 2, song_id: 10, song_title: "Evan Finds the Third Room", artist_id: 3 },
        { setlist_id: 9,  order: 3, song_id: 11, song_title: "Lady and Man",              artist_id: 3 }
      ]
    },
    {
      show_id: 4,
      date: "2025-07-04",
      ticketPrice: 60.00,
      venue_id: 4,
      artists: [4],
      setlist: [
        { setlist_id: 10, order: 1, song_id: 12, song_title: "Paprika",      artist_id: 4 },
        { setlist_id: 11, order: 2, song_id: 13, song_title: "Be Sweet",     artist_id: 4 }
      ]
    },
    {
      show_id: 5,
      date: "2025-08-18",
      ticketPrice: 50.00,
      venue_id: 1,
      artists: [1, 4],              // co-headliner show — Phoebe Bridgers + Japanese Breakfast
      setlist: [
        { setlist_id: 12, order: 1, song_id: 1,  song_title: "Motion Sickness", artist_id: 1 },
        { setlist_id: 13, order: 2, song_id: 12, song_title: "Paprika",         artist_id: 4 },
        { setlist_id: 14, order: 3, song_id: 13, song_title: "Be Sweet",        artist_id: 4 }
      ]
    },
    {
      show_id: 6,
      date: "2025-09-05",
      ticketPrice: 35.00,
      venue_id: 3,
      artists: [2, 3],              // co-headliner show — Mitski + Khruangbin
      setlist: [
        { setlist_id: 15, order: 1, song_id: 5,  song_title: "Nobody",          artist_id: 2 },
        { setlist_id: 16, order: 2, song_id: 9,  song_title: "Time (You and I)", artist_id: 3 },
        { setlist_id: 17, order: 3, song_id: 11, song_title: "Lady and Man",     artist_id: 3 }
      ]
    }
  ]);
  
  
  // ============================================================
  // COLLECTION: users (5 users with attendance histories)
  // ============================================================
  
  db.users.insertMany([
    {
      user_id: 1,
      username: "alexn",
      email: "alex@example.com",
      password: "hashed_pw_1",
      followed_artists: [1, 3],
      attendance: [
        { attendance_id: 1,  show_id: 1, date: "2025-03-15", rating: 5, review: "Incredible set, Phoebe played Motion Sickness!" },
        { attendance_id: 2,  show_id: 3, date: "2025-06-20", rating: 4, review: "Great vibes, Khruangbin was hypnotic." },
        { attendance_id: 3,  show_id: 5, date: "2025-08-18", rating: 5, review: "Best co-headliner show I've ever seen." }
      ]
    },
    {
      user_id: 2,
      username: "jsmith",
      email: "jsmith@example.com",
      password: "hashed_pw_2",
      followed_artists: [2],
      attendance: [
        { attendance_id: 4,  show_id: 2, date: "2025-04-10", rating: 5, review: "Mitski was transcendent. Cried twice." },
        { attendance_id: 5,  show_id: 6, date: "2025-09-05", rating: 4, review: "Mitski and Khruangbin together was wild." }
      ]
    },
    {
      user_id: 3,
      username: "mwilliams",
      email: "mwilliams@example.com",
      password: "hashed_pw_3",
      followed_artists: [1, 2, 4],
      attendance: [
        { attendance_id: 6,  show_id: 1, date: "2025-03-15", rating: 4, review: "Phoebe was amazing, great crowd energy." },
        { attendance_id: 7,  show_id: 4, date: "2025-07-04", rating: 5, review: "Japanese Breakfast blew my mind." },
        { attendance_id: 8,  show_id: 5, date: "2025-08-18", rating: 5, review: "Co-headliner was a dream lineup." },
        { attendance_id: 9,  show_id: 2, date: "2025-04-10", rating: 3, review: "Good show but the sound mix was off." }
      ]
    },
    {
      user_id: 4,
      username: "tlee",
      email: "tlee@example.com",
      password: "hashed_pw_4",
      followed_artists: [3, 4],
      attendance: [
        { attendance_id: 10, show_id: 3, date: "2025-06-20", rating: 5, review: "Khruangbin never misses." },
        { attendance_id: 11, show_id: 4, date: "2025-07-04", rating: 4, review: "Be Sweet live is something else." }
      ]
    },
    {
      user_id: 5,
      username: "rnguyen",
      email: "rnguyen@example.com",
      password: "hashed_pw_5",
      followed_artists: [1, 2, 3, 4],   // follows all artists
      attendance: [
        { attendance_id: 12, show_id: 1, date: "2025-03-15", rating: 5, review: "First show of the year, worth it." },
        { attendance_id: 13, show_id: 2, date: "2025-04-10", rating: 5, review: "Nobody live is haunting." },
        { attendance_id: 14, show_id: 3, date: "2025-06-20", rating: 4, review: "Chill night, great music." },
        { attendance_id: 15, show_id: 4, date: "2025-07-04", rating: 5, review: "Paprika is a perfect song." },
        { attendance_id: 16, show_id: 6, date: "2025-09-05", rating: 4, review: "Two great bands, one night." }
      ]
    }
  ]);