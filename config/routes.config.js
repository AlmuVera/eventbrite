const express = require("express");
const router = express.Router();
const upload =require ('../config/multer.config')

const { events, auth, users } = require("../controllers");
const secure = require("../middlewares/secure.mid");

router.get("/", events.list);
router.get("/events", events.list);
router.get("/events/new", secure.isAuthenticated, events.new);
router.get("/events/:id", events.detail);
router.post("/events", upload.single('image'), secure.isAuthenticated,events.create);
router.post("/events/:id/delete", secure.isAuthenticated, events.delete);


router.get("/events/:id/update", secure.isAuthenticated, events.update);
router.post("/events/:id/update", secure.isAuthenticated, events.doUpdate)

router.get("/register", auth.register);
router.post('/register', auth.doRegister);

router.get("/login", auth.login);
router.post('/login', auth.doLogin);
router.get("/logout", auth.logout);

router.get("/users/list", secure.isAuthenticated, users.list);

router.get("/events/:id/buyticket", secure.isAuthenticated, events.buyticket)
router.post("/events/:id/buyticket", secure.isAuthenticated, events.buyticketconfirmation)

router.get("/users/tickets", secure.isAuthenticated, users.tickets);
module.exports = router;

