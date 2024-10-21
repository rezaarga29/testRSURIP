const Karyawan = require("../models").Karyawan;
const Tlog = require("../models").Tlog;
const PDFDocument = require("pdfkit");
const fs = require("fs");

exports.createKaryawan = async (req, res) => {
  try {
    const data = await Karyawan.create(req.body);
    await Tlog.create({
      Tanggal: new Date(),
      Jam: new Date(),
      Keterangan: `Inserted new Karyawan`,
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllKaryawan = async (req, res) => {
  try {
    const data = await Karyawan.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getKaryawanById = async (req, res) => {
  try {
    const data = await Karyawan.findByPk(req.params.id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Karyawan not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateKaryawan = async (req, res) => {
  try {
    const [updated] = await Karyawan.update(req.body, {
      where: { Id: req.params.id },
    });
    if (updated) {
      const updatedKaryawan = await Karyawan.findByPk(req.params.id);
      await Tlog.create({
        Tanggal: new Date(),
        Jam: new Date(),
        Keterangan: `Updated Karyawan with ID: ${req.params.id}`,
      });
      res.status(200).json(updatedKaryawan);
    } else {
      res.status(404).json({ message: "Karyawan not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteKaryawan = async (req, res) => {
  try {
    const deleted = await Karyawan.destroy({
      where: { Id: req.params.id },
    });
    if (deleted) {
      await Tlog.create({
        Tanggal: new Date(),
        Jam: new Date(),
        Keterangan: `Deleted Karyawan with ID: ${req.params.id}`,
      });
      res.status(200).json({ message: "Karyawan deleted" });
    } else {
      res.status(404).json({ message: "Karyawan not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.generateKaryawanReport = async (req, res) => {
  try {
    const karyawans = await Karyawan.findAll();

    const doc = new PDFDocument();
    const filePath = "./reports/karyawan_report.pdf";
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(18).text("Karyawan Report", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text("ID", 50, 100);
    doc.text("Nama", 100, 100);
    doc.text("Tanggal Lahir", 200, 100);
    doc.text("Gaji", 300, 100);
    doc.moveDown();

    karyawans.forEach((karyawan, index) => {
      const yPosition = 120 + index * 20;
      doc.text(karyawan.Id, 50, yPosition);
      doc.text(karyawan.Nama, 100, yPosition);
      doc.text(karyawan.Tgl_Lahir, 200, yPosition);
      doc.text(karyawan.Gaji, 300, yPosition);
    });

    doc.end();

    doc.on("finish", () => {
      res.download(filePath, "karyawan_report.pdf", (err) => {
        if (err) {
          console.log("Error downloading file:", err);
        }
        fs.unlinkSync(filePath);
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
