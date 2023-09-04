import { connectMongoDB } from "@/libs/MongoConnect";
import Task from "@/models/TaskModel";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    res.status(405).send({ msg: "Only GET request are allowed." });
    return;
  }
  const mongoose = require("mongoose");

  const id = new mongoose.Types.ObjectId(req.body.id);
  console.log("taskidad", id);
  const updateData = req.body.updateData;

  try {
    await connectMongoDB();
    const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(200).send(updatedTask);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err, msg: "something went wrong !" });
  }
}
