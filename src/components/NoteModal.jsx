import { useState, useEffect } from "react";

export default function NoteModal({ note, open, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

 useEffect(() => {
  if (!open) return;

  if (note) {
    setTitle(note.title);
    setDescription(note.description);
    setTags(note.tags.join(", "));
  } else {
    setTitle("");
    setDescription("");
    setTags("");
  }
}, [note, open]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 text-indigo-800 font-semibold z-40 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="bg-indigo-600/40 rounded text-white shadow-lg w-[720px] max-w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center  font-semibold">
          <h3 className="text-lg font-semibold text-white">
            {note ? "View / Edit Note" : "New Note"}
          </h3>
          <button onClick={onClose} className="text-slate-600">
            Close
          </button>
        </div>

        <div className="text-white mt-4 space-y-3">
          <input
            className="w-full outline-none p-2 rounded bg-indigo-600 shadow-lg shadow-indigo-900"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            className="w-full outline-none p-2 rounded h-32 bg-indigo-600 shadow-lg shadow-indigo-900"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          ></textarea>
          <input
            className="w-full outline-none p-2 rounded bg-indigo-600 shadow-lg shadow-indigo-900"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
          />
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button onClick={onClose} className="px-3 py-2 rounded bg-indigo-800 shadow-lg shadow-indigo-900">
            Cancel
          </button>
          <button
            onClick={() => {
              const updated = {
                ...note,
                title: title.trim() || "Untitled",
                description: description.trim(),
                tags: tags
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
              };
              onSave(updated);
            }}
            className="px-4 py-2 bg-green-400 font-semibold text-black rounded shadow-lg shadow-green-800"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
