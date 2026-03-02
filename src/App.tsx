import React, { useState, useEffect } from "react";
import { Heart, Star, History, Trash2 } from "lucide-react";

// Questa parte dice a Vercel esattamente cosa aspettarsi
interface Messaggio {
  id: number;
  to: string;
  text: string;
  date: string;
}

export default function App() {
  const nomiFamiglia = {
    moglie: "Osita Laura",
    figli: [
      "Betzabet",
      "Sebastian",
      "Francesco",
      "Tabatha",
      "Valeria",
      "Trinidad",
      "Agustin",
      "Celeste",
    ],
  };

  const [selectedProfile, setSelectedProfile] = useState({
    name: nomiFamiglia.moglie,
    type: "Moglie",
  });
  const [thought, setThought] = useState("");

  // Specifichiamo il tipo <Messaggio[]> per evitare l'errore TS2345
  const [archive, setArchive] = useState<Messaggio[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem("project_eternity_data");
    if (savedData) {
      try {
        setArchive(JSON.parse(savedData));
      } catch (e) {
        setArchive([]);
      }
    }
  }, []);

  const handleSave = () => {
    const newMessage: Messaggio = {
      id: Date.now(),
      to: selectedProfile.name,
      text: thought,
      date: new Date().toLocaleDateString(),
    };

    const updatedArchive = [newMessage, ...archive];
    setArchive(updatedArchive);
    localStorage.setItem(
      "project_eternity_data",
      JSON.stringify(updatedArchive)
    );
    setThought("");
  };

  const deleteMessage = (id: number) => {
    const filtered = archive.filter((m) => m.id !== id);
    setArchive(filtered);
    localStorage.setItem("project_eternity_data", JSON.stringify(filtered));
  };

  const theme = {
    bg: "#050508",
    neon: "#00f2ff",
    rose: "#ff0077",
    border: "rgba(0, 242, 255, 0.2)",
  };

  return (
    <div
      style={{
        backgroundColor: theme.bg,
        color: theme.neon,
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "monospace",
      }}
    >
      <header
        style={{
          borderBottom: `1px solid ${theme.border}`,
          marginBottom: "20px",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", letterSpacing: "2px" }}>
          PROJECT: ETERNITY
        </h1>
      </header>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}
      >
        <aside>
          <button
            onClick={() =>
              setSelectedProfile({ name: nomiFamiglia.moglie, type: "Moglie" })
            }
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "10px",
              border: `2px solid ${
                selectedProfile.name === nomiFamiglia.moglie
                  ? theme.rose
                  : theme.border
              }`,
              color: theme.rose,
              cursor: "pointer",
              marginBottom: "20px",
              fontWeight: "bold",
              background: "transparent",
            }}
          >
            <Star size={16} /> {nomiFamiglia.moglie.toUpperCase()}
          </button>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
            }}
          >
            {nomiFamiglia.figli.map((n) => (
              <button
                key={n}
                onClick={() => setSelectedProfile({ name: n, type: "Figlio" })}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: `1px solid ${
                    selectedProfile.name === n ? theme.neon : theme.border
                  }`,
                  backgroundColor:
                    selectedProfile.name === n ? theme.neon : "transparent",
                  color: selectedProfile.name === n ? "#000" : theme.neon,
                  cursor: "pointer",
                  fontSize: "0.7rem",
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </aside>

        <main>
          <div
            style={{
              border: `1px solid ${theme.border}`,
              borderRadius: "20px",
              padding: "20px",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <p style={{ fontSize: "0.8rem", marginBottom: "10px" }}>
              A: {selectedProfile.name.toUpperCase()}
            </p>
            <textarea
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              placeholder="Scrivi un pensiero eterno..."
              style={{
                width: "100%",
                height: "150px",
                background: "transparent",
                color: "#fff",
                border: `1px dashed ${theme.border}`,
                padding: "10px",
                outline: "none",
              }}
            />
            <button
              onClick={handleSave}
              disabled={!thought}
              style={{
                width: "100%",
                padding: "15px",
                marginTop: "10px",
                background: theme.neon,
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
                color: "#000",
              }}
            >
              SALVA
            </button>
          </div>
          <div style={{ marginTop: "20px" }}>
            <p style={{ fontSize: "0.8rem", color: "#64748b" }}>
              <History size={14} /> ARCHIVIO LOCALE:
            </p>
            {archive.map((m) => (
              <div
                key={m.id}
                style={{
                  border: `1px solid ${theme.border}`,
                  padding: "12px",
                  marginTop: "10px",
                  position: "relative",
                  borderRadius: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "0.6rem",
                    color:
                      m.to === nomiFamiglia.moglie ? theme.rose : theme.neon,
                  }}
                >
                  {m.to} - {m.date}
                </span>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#fff",
                    marginTop: "5px",
                  }}
                >
                  {m.text}
                </p>
                <button
                  onClick={() => deleteMessage(m.id)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                    color: "#ef4444",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
