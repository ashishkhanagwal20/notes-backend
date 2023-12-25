const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as arguement");
  process.exit();
}

const password = process.argv[2];
// const url = `mongodb+srv://fullstack:${password}@cluster0.vx8ojri.mongodb.net/noteApp?retryWrites=true&w=majority`;
const url = `mongodb+srv://fullstack:${password}@cluster0.vx8ojri.mongodb.net/testNoteApp?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});

const note = new Note({
  content: "Java is statically typed language",
  important: true,
});

note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});
