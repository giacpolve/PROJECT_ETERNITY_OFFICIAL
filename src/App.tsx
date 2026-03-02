import React, { useState, useEffect } from "react";
import { Star, History, Trash2, ShieldCheck } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// --- DATI DALLA TUA FOTO ---
const SUPABASE_URL = "https://jfgqzdjmwunlivjulony.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_5KedbyiB-MIY_2my_EzL3A_pWemXtTo";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface Messaggio {
  id?: number;
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
  const [archive, setArchive] = useState<Messaggio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const { data, error } = await supabase
        .from("messaggi")
        .select("*")
        .order("id", { ascending: false });
      if (data) setArchive(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async () => {
    if (!thought.trim()) return;
    const newMessage = {
      to: selectedProfile.name,
      text: thought,
      date: new Date().toLocaleDateString(),
    };

    const { error } = await supabase.from("messaggi").insert([newMessage]);
    if (!error) {
      setThought("");
      fetchMessages();
    }
  };

  const deleteMessage = async (id: number) => {
    await supabase.from("messaggi").delete().eq("id", id);
    fetchMessages();
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "1.2rem", margin: 0 }}>PROJECT: ETERNITY</h1>
        <div
          style={{
            color: "#4ade80",
            fontSize: "0.7rem",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <ShieldCheck size={14} /> CLOUD ATTIVO
        </div>
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
              DESTINATARIO: {selectedProfile.name.toUpperCase()}
            </p>
            <textarea
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              style={{
                width: "100%",
                height: "120px",
                background: "transparent",
                color: "#fff",
                border: `1px dashed ${theme.border}`,
                padding: "10px",
                outline: "none",
              }}
            />
            <button
              onClick={handleSave}
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
              SALVA NELL'ETERNITÀ
            </button>
          </div>

          <div style={{ marginTop: "20px" }}>
            <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>
              <History size={14} /> ARCHIVIO MESSAGGI:
            </p>
            {loading ? (
              <p>Caricamento dalla cassaforte...</p>
            ) : (
              archive.map((m) => (
                <div
                  key={m.id}
                  style={{
                    border: `1px solid ${theme.border}`,
                    padding: "12px",
                    marginTop: "10px",
                    borderRadius: "10px",
                    position: "relative",
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
                      margin: "5px 0",
                    }}
                  >
                    {m.text}
                  </p>
                  <button
                    onClick={() => m.id && deleteMessage(m.id)}
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
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
