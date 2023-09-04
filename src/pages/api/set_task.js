// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectMongoDB } from "@/libs/MongoConnect";
import Task from "@/models/TaskModel";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ msg: "Only post request are allowed." });
    return;
  }
  const task = req.body;
  try {
    await connectMongoDB();
    Task.create(task).then((data) => {
      res.status(201).send(data);
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ err, msg: "something went wrong !" });
  }
}
