import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const modules = [
    { id: 1, title: "AI Basics", desc: "Introduction to AI", icon: "🤖" },
    { id: 2, title: "AI in Insurance", desc: "Insurance use cases", icon: "📊" },
    { id: 3, title: "AI in Compliance", desc: "Compliance automation", icon: "⚖️" },
    { id: 4, title: "Risk Management", desc: "AI for risk prediction", icon: "📈" },
    { id: 5, title: "Fraud Detection", desc: "Detect fraud using AI", icon: "🛡️" },
  ];

  const completed = JSON.parse(localStorage.getItem("completed")) || [];
  const progress = (completed.length / modules.length) * 100;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AI Training Modules</h1>
      <p style={styles.subtitle}>
        {progress.toFixed(0)}% Completed
      </p>

      {/* Progress Bar */}
      <div style={styles.progressWrapper}>
        <div
          style={{
            ...styles.progressBar,
            width: `${progress}%`,
          }}
        ></div>
      </div>

      {/* Modules */}
      <div style={styles.grid}>
        {modules.map((m) => (
          <div key={m.id} style={styles.card}>
            <div style={styles.icon}>{m.icon}</div>
            <h3>{m.title}</h3>
            <p>{m.desc}</p>

            <button
              style={styles.button}
              onClick={() => navigate(`/module/${m.id}`)}
            >
              Open Module →
            </button>
          </div>
        ))}
      </div>

      {/* Certificate Button */}
      <button
        style={{
          ...styles.certBtn,
          background:
            completed.length === 5
              ? "linear-gradient(90deg,#00e0ff,#00c3ff)"
              : "#555",
          cursor: completed.length === 5 ? "pointer" : "not-allowed",
        }}
        disabled={completed.length !== 5}
        onClick={() => navigate("/certificate")}
      >
        🎓 Generate Certificate
      </button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
    padding: "40px",
    color: "#fff",
    textAlign: "center",
  },
  title: { fontSize: "32px" },
  subtitle: { marginBottom: "20px", color: "#ccc" },

  progressWrapper: {
    width: "100%",
    height: "10px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "10px",
    marginBottom: "40px",
  },

  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg,#00e0ff,#00c3ff)",
    borderRadius: "10px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "25px",
  },

  card: {
    background: "rgba(255,255,255,0.05)",
    padding: "25px",
    borderRadius: "15px",
  },

  icon: { fontSize: "30px" },

  button: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#00c3ff",
    cursor: "pointer",
  },

  certBtn: {
    marginTop: "40px",
    width: "100%",
    padding: "15px",
    borderRadius: "10px",
    border: "none",
    fontWeight: "bold",
  },
};

export default Dashboard;