import { useState } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import Welcome from "./pages/Welcome";
import TodoPage from "./pages/TodoPage";
import AuthPage from "./pages/AuthPage";
import BrainDumpPage from "./pages/BrainDumpPage";
import CalendarPage from "./pages/CalendarPage";
import Nav from "./components/Nav";

function App() {
  const [user, setUser] = useState("any user");

  return (
    <>
      {user ? (
        <>
          <Nav />

          <div> Nav Bar {user}</div>
          <h1>Calendar App</h1>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/calendar" element={<CalendarPage />} />

            <Route path="/braindump" element={<BrainDumpPage />} />

            <Route path="/todos" element={<TodoPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage />
      )}
    </>
  );
}

export default App;
