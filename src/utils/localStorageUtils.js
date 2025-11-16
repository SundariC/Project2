export const getNotes = () => {
  try {
    return JSON.parse(localStorage.getItem("notes")) || [];
  } catch {
    return [];
  }
};

export const saveNotes = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

export const deleteNote = (id) => {
  const notes = getNotes();
  const filtered = notes.filter((note) => note.id !== id);
  localStorage.setItem("notes", JSON.stringify(filtered));
};
