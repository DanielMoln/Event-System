import express, { Router } from "express";

const router: Router = express.Router();

router.use('/organizer', require('./organizer/organizer.routes')(router));
router.use('/location', require('./location/location.routes')(router));
router.use('/event', require('./event/event.routes')(router));

module.exports = router;