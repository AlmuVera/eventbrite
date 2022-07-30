const express = require("express");
const router = express.Router();

const events = require("../controllers/events.controller")

router.get("/events", events.list);
router.get("/events/new", events.new);
router.get("/events/:id", events.detail);
router.post("/events", events.create);
router.post("/events/:id/delete", events.delete);


//Update para despues:
// router.get("/events/:id/update", events.update);
// router.post("/events/:id/update", events.doUpdate)


module.exports = router 

