import { useState } from "react"; // Removed useEffect
import ConfirmDialog from "../components/ConfirmDialog";
import { useNavigate } from "react-router-dom";
export default function TrashPage({ notes, updateNotes, setGlobalAlert }) {
  const [deleteId, setDeleteId] = useState(null);
   const navigate = useNavigate();

  const restore = (id) => {
    const next = notes.map((n) => (n.id === id ? { ...n, trashed: false } : n));

    updateNotes(next);
    setGlobalAlert("Note restored", "success");
  };

  const askDelete = (id) => {
    setDeleteId(id);
  };

  const deleteForever = () => {
    const next = notes.filter((n) => n.id !==deleteId);
    updateNotes(next);
    setGlobalAlert("Delete Permanently", "error");
    setDeleteId(null);
    if (next.filter(n => n.trashed). length === 0){
      navigate("/");
    } else {
      navigate ("/trash");
    }
  };

  const trashed = notes.filter((n) => n.trashed);
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-3 text-red-700">Trash ({trashed.length})</h2>
      <p className="text-sm text-slate-600 mb-4 font-semibold">
        Once deleted from here, notes cannot be recovered.
      </p>
      {trashed.length === 0 && (
        <div className="text-center text-red-500 mt-10 font-semibold">Trash is empty.</div>
      )}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trashed.map((n) => (
          <div key={n.id} 
          className="bg-red-500/30 ring-2 ring-red-600 rounded shadow-lg shadow-red-900 p-4 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-red-700">{n.title}</h3>
            <p className="text-sm mt-2 text-slate-700 font-semibold">{n.description}</p>
            <div className="flex gap-3 mt-4">
              <button
                onClick={(e) => { e.stopPropagation(); restore(n.id)}}
                className="px-3 py-1 rounded bg-green-600 text-white shadow-lg shadow-green-900"
              >
                Restore
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); askDelete(n.id)}}
                className="px-3 py-1 rounded bg-red-600 text-white shadow-lg shadow-red-800"
              >
                Delete Forever
              </button>
            </div>
          </div>
        ))}
      </section>
  
      <ConfirmDialog
        open={deleteId !== null}
        title="Delete permanently?"
        message="This cannot be undone."
        onCancel={() => setDeleteId(null)}
        onConfirm={deleteForever}
      />
    </main>
  );
}
