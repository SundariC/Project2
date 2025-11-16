export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-red-400 rounded shadow-lg shadow-red-900 w-96 p-5">
        <h3 className="font-semibold text-lg mb-2 text-red-800">{title}</h3>
        <p className="text-sm text-slate-700 mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-3 py-2 rounded border border-red-600 text-white shadow-lg shadow-black">Cancel</button>
          <button onClick={onConfirm} className="px-3 py-2 rounded bg-red-600 text-white shadow-lg shadow-red-800">Delete</button>
        </div>
      </div>
    </div>
  );
}
