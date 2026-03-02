import React, { useState, useEffect } from "react";
import {
  Heart,
  Star,
  Send,
  MessageSquareQuote,
  Briefcase,
  ScrollText,
  History,
  Hourglass,
  Trash2,
} from "lucide-react";

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
  const [activePillar, setActivePillar] = useState("family");
  const [thought, setThought] = useState("");

  // STATO PER LA MEMORIA PERSISTENTE
  const [archive, setArchive] = useState([]);

  // CARICA I MESSAGGI ALL'AVVIO
  useEffect(() => {
    const savedData = localStorage.getItem("project_eternity_data");
    if (savedData) {
      setArchive(JSON.parse(savedData));
    }
  }, []);

  // SALVA I MESSAGGI NELLA MEMORIA DEL BROWSER
  const handleSave = () => {
    const newMessage = {
      id: Date.now(),
      to: selectedProfile.name,
      text: thought,
      pillar: activePillar,
      date: new Date().toLocaleDateString(),
    };

    const updatedArchive = [newMessage, ...archive];
    setArchive(updatedArchive);
    localStorage.setItem(
      "project_eternity_data",
      JSON.stringify(updatedArchive)
    );

    setThought("");
    alert(
      `Messaggio per ${selectedProfile.name} salvato nella memoria locale!`
    );
  };

  const deleteMessage = (id) => {
    const filtered = archive.filter((m) => m.id !== id);
    setArchive(filtered);
    localStorage.setItem("project_eternity_data", JSON.stringify(filtered));
  };

  const theme = {
    bg: "#050508",
    neon: "#00f2ff",
    rose: "#ff0077",
    darkCyan: "#0891b2",
    border: "rgba(0, 242, 255, 0.2)",
    glass: "rgba(8, 145, 178, 0.1)",
  };

  return (
    <div
      style={{
        backgroundColor: theme.bg,
        color: theme.neon,
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "monospace",
        backgroundImage:
          "radial-gradient(circle at 50% 50%, #101835 0%, #050508 100%)",
      }}
    >
      <header
        style={{
          borderBottom: `1px solid ${theme.border}`,
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "10px",
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "900",
            fontStyle: "italic",
            margin: 0,
          }}
        >
          PROJECT: ETERNITY
        </h1>
        <div style={{ color: "#4ade80", fontSize: "0.6rem" }}>
          ● MEMORIA LOCALE ATTIVA
        </div>
      </header>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}
      >
        <aside>
          <p
            style={{
              fontSize: "0.7rem",
              color: theme.rose,
              fontWeight: "bold",
            }}
          >
            MIA MOGLIE:
          </p>
          <button
            onClick={() =>
              setSelectedProfile({ name: nomiFamiglia.moglie, type: "Moglie" })
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "20px",
              border: `2px solid ${
                selectedProfile.name === nomiFamiglia.moglie
                  ? theme.rose
                  : theme.border
              }`,
              backgroundColor:
                selectedProfile.name === nomiFamiglia.moglie
                  ? "rgba(255, 0, 119, 0.2)"
                  : "transparent",
              color: theme.rose,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            <Star size={16} /> {nomiFamiglia.moglie.toUpperCase()}
          </button>

          <p style={{ fontSize: "0.7rem", color: theme.darkCyan }}>
            I MIEI 8 FIGLI:
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            {nomiFamiglia.figli.map((nome, i) => (
              <button
                key={i}
                onClick={() =>
                  setSelectedProfile({ name: nome, type: "Figlio" })
                }
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: `1px solid ${
                    selectedProfile.name === nome ? theme.neon : theme.border
                  }`,
                  backgroundColor:
                    selectedProfile.name === nome ? theme.neon : "transparent",
                  color: selectedProfile.name === nome ? "#000" : theme.neon,
                  cursor: "pointer",
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                }}
              >
                {nome}
              </button>
            ))}
          </div>
        </aside>

        <main>
          <div
            style={{
              border: `1px solid ${
                selectedProfile.type === "Moglie" ? theme.rose : theme.border
              }`,
              borderRadius: "20px",
              padding: "20px",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <p
              style={{
                fontSize: "0.8rem",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              SCRIVI A: {selectedProfile.name.toUpperCase()}
            </p>
            <textarea
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              placeholder="Scrivi qui il tuo messaggio..."
              style={{
                width: "100%",
                height: "150px",
                backgroundColor: "transparent",
                border: `1px dashed ${theme.border}`,
                borderRadius: "12px",
                color: "#fff",
                padding: "15px",
                outline: "none",
                resize: "none",
                marginBottom: "15px",
              }}
            />
            <button
              onClick={handleSave}
              disabled={!thought}
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor:
                  selectedProfile.type === "Moglie" ? theme.rose : theme.neon,
                color: "#000",
                border: "none",
                borderRadius: "12px",
                fontWeight: "900",
                cursor: "pointer",
              }}
            >
              SALVA NELLA MEMORIA
            </button>
          </div>

          {/* ARCHIVIO STORICO REAL-TIME */}
          <div style={{ marginTop: "30px" }}>
            <p
              style={{
                fontSize: "0.8rem",
                color: theme.darkCyan,
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <History size={16} /> ARCHIVIO MESSAGGI SALVATI:
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                maxHeight: "300px",
                overflowY: "auto",
                paddingRight: "10px",
              }}
            >
              {archive.length === 0 && (
                <p style={{ fontSize: "0.7rem", color: "#64748b" }}>
                  Nessun messaggio salvato ancora.
                </p>
              )}
              {archive.map((m) => (
                <div
                  key={m.id}
                  style={{
                    padding: "12px",
                    borderRadius: "10px",
                    border: `1px solid ${theme.border}`,
                    backgroundColor: "rgba(255,255,255,0.02)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.6rem",
                        color:
                          m.to === nomiFamiglia.moglie
                            ? theme.rose
                            : theme.neon,
                        fontWeight: "bold",
                      }}
                    >
                      PER: {m.to.toUpperCase()}
                    </span>
                    <span style={{ fontSize: "0.5rem", color: "#64748b" }}>
                      {m.date}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "#fff", margin: 0 }}>
                    {m.text}
                  </p>
                  <button
                    onClick={() => deleteMessage(m.id)}
                    style={{
                      position: "absolute",
                      right: "5px",
                      bottom: "5px",
                      background: "none",
                      border: "none",
                      color: "#ef4444",
                      cursor: "pointer",
                    }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
