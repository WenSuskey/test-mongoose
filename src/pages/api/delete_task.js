import { connectMongoDB } from "@/libs/MongoConnect";
import Task from "@/models/TaskModel";
export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.status(405).send({ msg: "Only GET request are allowed." });
    return;
  }
  const mongoose = require("mongoose");

  const task_id = new mongoose.Types.ObjectId(req.body.id);
  console.log("taskidad", task_id);
  try {
    await connectMongoDB();

    const result = await Task.deleteOne({ _id: task_id });
    res.status(200).send(result);
    console.log(result);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err, msg: "something went wrong !" });
  }
}
