import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
