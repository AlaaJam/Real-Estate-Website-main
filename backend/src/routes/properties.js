import { Router } from "express";
import { listings } from "../data/listing.js"; // renamed export to "listings"

const router = Router();

// GET /api/properties?featured=true&limit=6
router.get("/", (req, res) => {
  let data = listings;
  const { featured, limit } = req.query;

  if (featured === "true") data = data.filter(p => p.featured === true);
  if (limit) data = data.slice(0, Number(limit));

  res.json(data);
});

// GET /api/properties/:id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const property = listings.find(p => p.id === id);
  if (!property) return res.status(404).json({ message: "Property not found" });
  res.json(property);
});

export default router;
