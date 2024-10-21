const express = require("express");
const router = express.Router();
const karyawanController = require("../controllers/karyawanController");

router.post("/karyawan", karyawanController.createKaryawan);

router.get("/karyawan", karyawanController.getAllKaryawan);

router.get("/karyawan/:id", karyawanController.getKaryawanById);

router.put("/karyawan/:id", karyawanController.updateKaryawan);

router.delete("/karyawan/:id", karyawanController.deleteKaryawan);

router.get("/karyawan/report", karyawanController.generateKaryawanReport);

module.exports = router;
