const express = require("express");
const router = express.Router();

const events = require("../controllers/events.controller")

router.get("/events", events.list);
router.get("/events/new", events.create);
router.post("/events/new", events.doCreate);
// router.get("/events/:id", events.detail);
router.get("/events/:id/detail", events.detail);
router.get("/events/:id/update", events.update);
router.post("/events/:id/update", events.doUpdate)
router.post("/events/:id/delete", events.delete);

module.exports = router 

