const express = require("express");
const router = express.Router();
const { getDb } = require("../db/mydb");

async function getVenues() {
  const db = await getDb();
  return db.collection("venues").find().sort({ name: 1 }).toArray();
}

async function getNextId() {
  const db = await getDb();
  const last = await db.collection("shows").find().sort({ show_id: -1 }).limit(1).toArray();
  return last.length > 0 ? last[0].show_id + 1 : 1;
}

// READ - List all shows with venue name
router.get("/", async (req, res) => {
  const db = await getDb();
  const shows = await db.collection("shows").aggregate([
    {
      $lookup: {
        from: "venues",
        localField: "venue_id",
        foreignField: "venue_id",
        as: "venue"
      }
    },
    { $unwind: "$venue" },
    { $sort: { date: -1 } }
  ]).toArray();
  res.render("shows", { shows });
});

// CREATE - Show form
router.get("/new", async (req, res) => {
  const venues = await getVenues();
  res.render("showForm", { venues });
});

// CREATE - Handle form submission
router.post("/", async (req, res) => {
  const { date, ticketPrice, venue_id } = req.body;
  const db = await getDb();
  const show_id = await getNextId();
  await db.collection("shows").insertOne({
    show_id,
    date,
    ticketPrice: ticketPrice ? parseFloat(ticketPrice) : null,
    venue_id: parseInt(venue_id),
    artists: [],
    setlist: []
  });
  res.redirect("/shows");
});

// UPDATE - Show edit form
router.get("/:id/edit", async (req, res) => {
  const db = await getDb();
  const show = await db.collection("shows").findOne({ show_id: parseInt(req.params.id) });
  if (!show) return res.status(404).send("Show not found");
  const venues = await getVenues();
  res.render("showEdit", { show, venues });
});

// UPDATE - Handle edit submission
router.post("/:id/edit", async (req, res) => {
  const { date, ticketPrice, venue_id } = req.body;
  const db = await getDb();
  await db.collection("shows").updateOne(
    { show_id: parseInt(req.params.id) },
    {
      $set: {
        date,
        ticketPrice: ticketPrice ? parseFloat(ticketPrice) : null,
        venue_id: parseInt(venue_id)
      }
    }
  );
  res.redirect("/shows");
});

// DELETE - Handle deletion
router.post("/:id/delete", async (req, res) => {
  const db = await getDb();
  await db.collection("shows").deleteOne({ show_id: parseInt(req.params.id) });
  res.redirect("/shows");
});

module.exports = router;