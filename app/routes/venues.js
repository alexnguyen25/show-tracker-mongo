const express = require("express");
const router = express.Router();
const { getDb } = require("../db/mydb");

async function getNextId() {
  const db = await getDb();
  const last = await db.collection("venues").find().sort({ venue_id: -1 }).limit(1).toArray();
  return last.length > 0 ? last[0].venue_id + 1 : 1;
}

// READ - List all venues
router.get("/", async (req, res) => {
  const db = await getDb();
  const venues = await db.collection("venues").find().sort({ name: 1 }).toArray();
  res.render("venues", { venues });
});

// CREATE - Show form
router.get("/new", (req, res) => {
  res.render("venueForm");
});

// CREATE - Handle form submission
router.post("/", async (req, res) => {
  const { name, city, state, capacity, genreTags } = req.body;
  const db = await getDb();
  const venue_id = await getNextId();
  await db.collection("venues").insertOne({
    venue_id,
    name,
    city,
    state,
    capacity: capacity ? parseInt(capacity) : null,
    genreTags: genreTags ? genreTags.split(",").map(t => t.trim()) : []
  });
  res.redirect("/venues");
});

// UPDATE - Show edit form
router.get("/:id/edit", async (req, res) => {
  const db = await getDb();
  const venue = await db.collection("venues").findOne({ venue_id: parseInt(req.params.id) });
  if (!venue) return res.status(404).send("Venue not found");
  res.render("venueEdit", { venue });
});

// UPDATE - Handle edit submission
router.post("/:id/edit", async (req, res) => {
  const { name, city, state, capacity, genreTags } = req.body;
  const db = await getDb();
  await db.collection("venues").updateOne(
    { venue_id: parseInt(req.params.id) },
    {
      $set: {
        name,
        city,
        state,
        capacity: capacity ? parseInt(capacity) : null,
        genreTags: genreTags ? genreTags.split(",").map(t => t.trim()) : []
      }
    }
  );
  res.redirect("/venues");
});

// DELETE - Handle deletion
router.post("/:id/delete", async (req, res) => {
  const db = await getDb();
  await db.collection("venues").deleteOne({ venue_id: parseInt(req.params.id) });
  res.redirect("/venues");
});

module.exports = router;