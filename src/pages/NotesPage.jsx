import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";
import TagFilter from "../components/TagFilter";

export default function NotesPage({
  notes,
  updateNotes,
  searchValue,
  setGlobalAlert,
}) {
  const [activeTag, setActiveTag] = useState(null);
  const [modalNote, setModalNote] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editableNote, setEditableNote] = useState(null);
  const addOrUpdate = (note) => {
    let next;
    if (note.id) {
      next = notes.map((n) => (n.id === note.id ? { ...n, ...note } : n));
      setGlobalAlert("Note updated", "success");
    } else {
      const created = {
        ...note,
        id: Date.now(),
        pinned: false,
        archived: false,
        trashed: false,
      };
      next = [created, ...notes];
      setGlobalAlert("Note added", "success");
    }
    updateNotes(next);
    setModalOpen(false);
  };
  const togglePin = (id) => {
    const next = notes.map((n) =>
      n.id === id ? { ...n, pinned: !n.pinned } : n
    );
    updateNotes(next);
  };
  const toggleArchive = (id) => {
    const next = notes.map((n) =>
      n.id === id ? { ...n, archived: true, pinned: false } : n
    );
    updateNotes(next);
    setGlobalAlert("Moved to archive", "info");
  };
  const moveToTrash = (id) => {
    const next = notes.map((n) => (n.id === id ? { ...n, trashed: true } : n));
    updateNotes(next);
    setGlobalAlert("Moved to trash", "error");
  };
  const openForView = (note) => {
    setEditableNote(null);
    setModalNote(note);
    setModalOpen(true);
  };
  const openNewNote = () => {
    setEditableNote(null); 
    setModalOpen(true);
  };
  const openEditNote = (note) => {
    setModalNote(null);
    setEditableNote(note); 
    setModalOpen(true);
  };
  const allActive = notes.filter((n) => !n.archived && !n.trashed);
  const filteredByTag = activeTag
    ? allActive.filter((n) => n.tags.includes(activeTag))
    : allActive;
  const searched = filteredByTag.filter(
    (n) =>
      n.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      n.description.toLowerCase().includes(searchValue.toLowerCase())
  );
  const pinned = searched.filter((n) => n.pinned);
  const others = searched.filter((n) => !n.pinned);
  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Notes</h2>
          <p className="text-sm text-slate-600 font-semibold">Your notes here</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setModalNote(null);
              setModalOpen(true);
            }}
            className="px-3 py-2 bg-lime-700 text-white rounded shadow-lg shadow-lime-900"
          >
            New Note
          </button>
        </div>
      </div>
      <TagFilter
        notes={notes}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
        clearTag={() => setActiveTag(null)}
      />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pinned.map((n) => (
          <NoteCard
            key={n.id}
            note={n}
            onPin={togglePin}
            onArchive={toggleArchive}
            onTrash={moveToTrash}
            onOpen={openForView}
          />
        ))}
        {others.map((n) => (
          <NoteCard
            key={n.id}
            note={n}
            onPin={togglePin}
            onEdit={openEditNote}
            onArchive={toggleArchive}
            onTrash={moveToTrash}
            onOpen={openForView}
          />
        ))}
      </section>
      {searched.length === 0 && (
        <div className="mt-6 text-center text-slate-600">No notes found.</div>
      )}
      <NoteModal
        open={isModalOpen}
        note={editableNote || modalNote}
        onClose={() => {
          setModalNote(null);
          setEditableNote(null);
          setModalOpen(false);
        }}
        onSave={addOrUpdate}
      />
    </main>
  );
}
