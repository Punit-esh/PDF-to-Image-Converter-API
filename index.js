const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const pdfPoppler = require("pdf-poppler");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3000;

const downloadPDF = (url, outputPath) =>
  axios({ url, responseType: "stream" }).then(
    (response) =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(outputPath))
          .on("finish", resolve)
          .on("error", reject);
      })
  );

app.get("/get-first-page-image", async (req, res) => {
  const { pdfUrl } = req.query;
  if (!pdfUrl) return res.status(400).json({ error: "PDF URL is required" });

  const requestId = uuidv4();
  const tempDir = path.join(__dirname, `temp_${requestId}`);
  fs.mkdirSync(tempDir);

  const pdfPath = path.join(tempDir, "temp.pdf");
  const outputPath = path.join(tempDir, "output-1.jpg");

  try {
    await downloadPDF(pdfUrl, pdfPath);
    await pdfPoppler.convert(pdfPath, {
      format: "jpeg",
      out_dir: tempDir,
      out_prefix: "output",
      page: 1,
    });
    if (!fs.existsSync(outputPath)) throw new Error("Image conversion failed");

    res.sendFile(outputPath, (err) => {
      if (err) {
        console.error("Error sending image:", err);
      }
      fs.rm(tempDir, { recursive: true, force: true }, (cleanupErr) => {
        if (cleanupErr) {
          console.error("Error during cleanup:", cleanupErr);
        }
      });
    });
  } catch (error) {
    fs.rm(tempDir, { recursive: true, force: true }, (cleanupErr) => {
      if (cleanupErr) {
        console.error("Error during cleanup:", cleanupErr);
      }
    });
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
