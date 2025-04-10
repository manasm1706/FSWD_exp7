const mongoose = require('mongoose');
const Student = require('./model/student');

const uri = "mongodb://localhost:27017/studentdatabase";

async function performCRUD() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    const insertResponse = await Student.insertMany([
      { id: 101, name: "Amit Sharma", course: "Computer Science" },
      { id: 102, name: "Priya Verma", course: "Electronics" },
      { id: 103, name: "Rahul Singh", course: "Mechanical Engineering" }
    ]);

    const findAll = await Student.find({});
    console.log("All Students:\n", findAll);

    const updateResponse = await Student.updateOne(
      { id: 101 },
      { $set: { course: "Data Science" } }
    );


    console.log("Update Result:\n", updateResponse);

    const updatedStudent = await Student.findOne({ id: 101 });
    console.log("Updated Student:\n", updatedStudent);

    const deleteResponse = await Student.deleteOne({ id: 103 });
    console.log("Delete Result:\n", deleteResponse);
    const remaining = await Student.find({});
    console.log("Remaining Students:\n", remaining);

  } catch (error) {
    console.error("Error performing CRUD operations:", error);
  } finally {
    await mongoose.disconnect();
  }
}
