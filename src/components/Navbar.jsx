import { Link, useLocation } from "react-router-dom";

export default function Navbar({ counts, search, setSearch }) {
  const loc = useLocation();
  return (
    <header className="bg-lime-500/50 shadow-lg shadow-lime-500 px-6 py-4 sticky top-0 z-20">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 font-semibold">
          <h1 className="text-2xl font-semibold text-green-800">Notes</h1>
          <nav className="flex gap-3 text-sm">
            <Link className={`px-4 py-2 rounded text-green-400 ${loc.pathname === "/" ? "bg-green-100 shadow-lg shadow-green-400 font-semibold" : "text-green-600"}`} to="/">All <span className="ml-1 text-xs text-slate-500">({counts.total})</span></Link>
            <Link className={`px-4 py-2 rounded text-indigo-400 ${loc.pathname === "/archive" ? "bg-indigo-100 shadow-lg shadow-indigo-400 font-semibold" : "text-indigo-600 "}`} to="/archive">Archive <span className="ml-1 text-xs text-slate-500">({counts.archived})</span></Link>
            <Link className={`px-4 py-2 rounded text-red-400 ${loc.pathname === "/trash" ? "bg-red-100 shadow-lg shadow-red-400 font-semibold" : "text-red-600"}`} to="/trash">Trash <span className="ml-1 text-xs text-slate-500">({counts.trashed})</span></Link>
          </nav>
        </div>
        <div className="flex items-center gap-4 w-80">
          <div className="relative w-full">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title or description..."
              className="w-full bg-lime-700/20 ring-2 ring-lime-700 text-black py-2 px-3 rounded border focus:outline-none focus:ring-2 focus:ring-lime-600"
            />
          </div>
          <div className="text-sm text-slate-600">
            <div>Pinned: <span className="font-medium text-yellow-500">{counts.pinned}</span></div>
          </div>
        </div>
      </div>
    </header>
  );
}
