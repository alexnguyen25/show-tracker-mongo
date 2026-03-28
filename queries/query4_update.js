// ============================================================
// QUERY 4 – Update a Document
// Toggle the isActive field on the song "Funeral" (song_id: 3)
// by Phoebe Bridgers (artist_id: 1).
// Flips false → true (run again to flip back).
// ============================================================

db.artists.updateOne(
    {
      artist_id: 1,
      "songs.song_id": 3
    },
    [
      {
        $set: {
          "songs.$[song].isActive": {
            $not: ["$$song.isActive"]
          }
        }
      }
    ],
    {
      arrayFilters: [{ "song.song_id": 3 }]
    }
  );
  
  // Expected output:
  // { acknowledged: true, matchedCount: 1, modifiedCount: 1 }
  // Run the following to verify the flip:
  // db.artists.findOne({ artist_id: 1 })