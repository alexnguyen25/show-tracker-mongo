// ============================================================
// QUERY 4 – Update a Document
// Toggle the isActive field on the song "Funeral" (song_id: 3)
// by Phoebe Bridgers (artist_id: 1).
// Uses the positional $ operator to target the matching
// array element and $set to update the boolean field.
// ============================================================

// Step 1 — Disable the song (set isActive to false)
db.artists.updateOne(
  { artist_id: 1, "songs.song_id": 3 },
  { $set: { "songs.$.isActive": false } }
);

// Step 2 — Re-enable the song (set isActive to true)
db.artists.updateOne(
  { artist_id: 1, "songs.song_id": 3 },
  { $set: { "songs.$.isActive": true } }
);

// Verify the result
db.artists.findOne(
  { artist_id: 1 },
  { songs: 1 }
);

// Expected output after Step 2:
// songs array includes: { song_id: 3, title: "Funeral", isActive: true }