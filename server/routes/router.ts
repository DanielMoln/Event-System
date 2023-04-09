import express, { Router } from "express";

const router: Router = express.Router();

router.use('/organizer', require('./organizer/organizer.routes')());
router.use('/location', require('./location/location.routes')());
router.use('/event', require('./event/event.routes')());

module.exports = router;