const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let student = [
  { id: 1, name: "Manas Mungekar", course: "CSE" },
  { id: 2, name: "Ishow Speed", course: "IT" },
  { id: 3, name: "Rohit Singh", course: "EXTC" },
  { id: 4, name: "Messi", course: "CSE" },
];

app.get('/', (req, res) => {
  res.send('Welcome to Vesit!');
});

app.get('/student', (req, res) => {
  if (!student) {
    return res.status(404).json({ error: "Cannot find students" });
  }
  res.json(student);
});

app.get('/student/:id', (req, res) => {
  const studentDetail = student.find(s => s.id == req.params.id);
  res.json(studentDetail);
});

app.post('/studentsignup', (req, res) => {
  const { id, name, course } = req.body;
  const idExists = student.some(s => s.id === id);
  if (idExists) {
    return res.status(400).json({ error: "ID already exists" });
  }
  const newStudent = { id, name, course };
  student.push(newStudent);
  res.json({ message: "Student added", data: newStudent });
});

app.put('/studentdetupdate/:id', (req, res) => {
  const { name, course } = req.body;
  const index = student.findIndex(s => s.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  if (name) student[index].name = name;
  if (course) student[index].course = course;

  res.json({ message: "Student updated", data: student[index] });
});

app.delete('/studentdelete/:id', (req, res) => {
  const index = student.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }
  const removedStudent = student.splice(index, 1);
  res.json({ message: "Student deleted", student: removedStudent[0] });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
