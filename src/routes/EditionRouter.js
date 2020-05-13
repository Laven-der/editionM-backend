const express = require('express');
const route = express.Router();
const EditionController = require('../controllers/EditionController');

route.get("/setServise", EditionController.setServiceEdition);
route.post("/uploadPagefile", EditionController.uploadPagefile);
route.get("/downloadPagefile", EditionController.downloadPagefile);
route.get("/downloadDir", EditionController.downloadDir);
route.get("/getEditionPage", EditionController.getEditionPage);
route.get("/getEditionLists", EditionController.getEditionLists);
route.post("/updateEditionItem", EditionController.updateEditionItem);
route.post("/addEditionItem", EditionController.addEditionItem);
route.get("/deleteEditionItem", EditionController.deleteEditionItem);
module.exports = route;