import NoteCard from "../components/NoteCard";

export default function ArchivePage({ notes, updateNotes, setGlobalAlert }) {

  const restore = (id) => {
    const next = notes.map(n =>
      n.id === id ? { ...n, archived: false } : n
    );
    updateNotes(next);
    setGlobalAlert("Note Restored", "success");
  };

  const moveToTrash = (id) => {
    const next = notes.map(n =>
      n.id === id ? { ...n, trashed: true, archived: false } : n
    );
    updateNotes(next);
    setGlobalAlert("Moved to Trash", "error");
  };

  const archivedNotes = notes.filter(n => n.archived && !n.trashed);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-2 text-indigo-700">
        Archive ({archivedNotes.length})
      </h2>

      <p className="text-sm text-slate-600 mb-4 font-semibold">
        Restore or move notes to trash from here.
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 test-indigo-600">
        {archivedNotes.map(n => (
          <NoteCard 
            key={n.id}
            note={n}       
            onArchive={restore}      
            onTrash={moveToTrash}    
            onOpen={() => {}}   
            className="bg-indigo-500/30 border ring-2 ring-indigo-500 border-indigo-300 shadow-lg shadow-indigo-700 rounded-lg p-4 text-indigo-800 font-semibold" 
          />
        ))}
      </section>
      {archivedNotes.length === 0 && (
        <div className="mt-6 text-center text-indigo-600 font-semibold">
          No archived notes.
        </div>
      )}
    </main>
  );
}
