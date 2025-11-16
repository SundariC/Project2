export default function NoteCard({
  note,
  onPin,
  onArchive,
  onTrash,
  onOpen,
  onEdit,
  className,
}) {
 const bgClass = className || (note.pinned ? "ring-2 ring-yellow-400 bg-yellow-500/30 shadow-lg shadow-yellow-700" : "bg-lime-400/20 shadow-lg shadow-lime-800 ring-2 ring-lime-700");
  return (
    <article
      onClick={() => onOpen(note)}
      className={`rounded p-4 shadow-lg hover:shadow-lg transition ${bgClass}`}
    >
      <div className="cursor-pointer select-none">
        <h3 className="text-lg font-semibold break-words">{note.title}</h3>
        <p className="mt-2 text-sm text-slate-700 whitespace-pre-line line-clamp-3 font-semibold">
          {note.description}
        </p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {note.tags.map((t) => (
          <span key={t} className="text-xs bg-gray-200 px-2 py-1 rounded">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 flex justify-end gap-2">
        {onPin && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPin(note.id);
            }}
            className={`px-3 py-1 text-sm rounded bg-yellow-400 text-white font-semibold shadow-lg shadow-yellow-600 ${
              note.pinned ? "bg-yellow-400 text-white" : "bg-gray-100"
            }`}
          >
            {note.pinned ? "Pinned" : "Pin"}
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onArchive(note.id);
          }}
          className="px-3 py-1 text-sm rounded bg-indigo-600 text-white shadow-lg shadow-indigo-900 font-semibold"
        >
          {note.archived ? "Unarchive" : "Archive"}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onTrash(note.id);
          }}
          className="px-3 py-1 text-sm rounded bg-red-600 text-white shadow-lg shadow-red-900 font-semibold"
        >
          {note.trashed ? "Delete Forever" : "Trash"}
        </button>
        { onEdit && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // IMPORTANT
            onEdit(note);
          }}
          className="px-2 py-1 text-sm font-semibold text-white bg-lime-500 shadow-lg shadow-lime-800 rounded"
        >
          Edit
        </button>)}
      </div>
    </article>
  );
}
