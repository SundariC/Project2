export default function TagFilter({ notes, activeTag, setActiveTag, clearTag }) {
  const tags = [...new Set(notes.flatMap(n => n.tags))].filter(Boolean);
  if (tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button onClick={clearTag} className={`px-3 py-1 rounded ${!activeTag ? "bg-indigo-600 text-white" : "bg-gray-100"}`}>All</button>
      {tags.map(t => (
        <button key={t} onClick={() => setActiveTag(t)} className={`px-3 py-1 rounded ${activeTag === t ? "bg-indigo-600 text-white" : "bg-gray-100"}`}>
          {t}
        </button>
      ))}
    </div>
  );
}
