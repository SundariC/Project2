import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import NotesPage from "./pages/NotesPage";
import ArchivePage from "./pages/ArchivePage";
import TrashPage from "./pages/TrashPage";
import { getNotes, saveNotes } from "./utils/localStorageUtils";
import Alert from "./components/Alert";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [globalAlert, setGlobalAlertState] = useState(null);

  useEffect(() => {
    setNotes(getNotes());
  }, []);

  const updateNotes = (next) => {
    saveNotes(next);
    setNotes(next);
  };

  const setGlobalAlert = (message, type = "info") => {
    setGlobalAlertState({ message, type });
    setTimeout(() => setGlobalAlertState(null), 2500);
  };

  const counts = useMemo(() => {
    return {
      total: notes.filter(n => !n.archived && !n.trashed).length,
      pinned: notes.filter(n => n.pinned && !n.archived && !n.trashed).length,
      archived: notes.filter(n => n.archived && !n.trashed).length,
      trashed: notes.filter(n => n.trashed).length
    };
  }, [notes]);

  return (
    <BrowserRouter>
      <Navbar counts={counts} search={search} setSearch={setSearch} />
      {globalAlert && <Alert message={globalAlert.message} type={globalAlert.type} />}
      <div className="min-h-screen bg-teal-100 text-lime-800">
      <Routes>
        <Route
          path="/"
          element={
            <NotesPage
              notes={notes}
              updateNotes={updateNotes}
              searchValue={search}
              setGlobalAlert={setGlobalAlert}
            />
          }
        />
        <Route
          path="/archive"
          element={
            <ArchivePage
              notes={notes}
              updateNotes={updateNotes}
              setGlobalAlert={setGlobalAlert}
            />
          }
        />
        <Route
          path="/trash"
          element={
            <TrashPage
              notes={notes}
              updateNotes={updateNotes}
              setGlobalAlert={setGlobalAlert}
            />
          }
        />
      </Routes>
       </div>
    </BrowserRouter>
   
  );
}
