const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "..", "notes.json");

function isValidData(data) {
  return (
    data &&
    typeof data === "object" &&
    Number.isInteger(data.nextId) &&
    Array.isArray(data.notes)
  );
}

function load() {
  let raw;
  try {
    raw = fs.readFileSync(FILE, "utf8");
  } catch (err) {
    if (err.code === "ENOENT") {
      return { nextId: 1, notes: [] };
    }
    throw err;
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    console.error(`Warning: ${FILE} contains invalid JSON. Starting from an empty note list.`);
    return { nextId: 1, notes: [] };
  }

  if (!isValidData(data)) {
    console.error(`Warning: ${FILE} has an unexpected shape. Starting from an empty note list.`);
    return { nextId: 1, notes: [] };
  }

  return data;
}

function save(data) {
  const tmpFile = `${FILE}.tmp`;
  fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2));
  fs.renameSync(tmpFile, FILE);
}

function all() {
  return load().notes;
}

function add(text) {
  const data = load();
  const note = { id: data.nextId, text };
  data.notes.push(note);
  data.nextId += 1;
  save(data);
  return note;
}

function remove(id) {
  const data = load();
  const before = data.notes.length;
  data.notes = data.notes.filter((n) => n.id !== id);
  save(data);
  return data.notes.length < before;
}

module.exports = { all, add, remove };
