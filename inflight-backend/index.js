import express from "express";
import mongoose from "mongoose";
import Plan from "./models/Plan.js";
import Activation from "./models/Activation.js";
import bodyParser from "body-parser";

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/inflight-database")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const app = express();
app.use(bodyParser.json());
app.get("/api/", (req, res) => {
  res.send("Hello");
});
// Endpoint to get all plans
app.get("/api/v1/plans", async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint to activate a plan
app.post("/api/v1/activate", async (req, res) => {
  try {
    console.log("plan: ", req.body);
    const plan = await Plan.findById(req.body.planId);
    if (!plan) {
      return res.status(404).send("Plan not found");
    }

    const activation = new Activation({
      planId: plan._id,
      startTime: new Date(),
      remainingData: plan.data,
    });

    await activation.save();
    res.json(activation);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint to get activation metrics
app.get("/api/v1/metrics", async (req, res) => {
  try {
    const activation = await Activation.findOne()
      .sort({ startTime: -1 })
      .populate("planId");
    if (!activation) {
      return res.status(404).send("No active plan");
    }

    activation.endTime = new Date();
    await activation.save();

    res.json(activation);
  } catch (err) {
    res.status(500).send(err);
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
