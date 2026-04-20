import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>

      { }
      <div style={styles.hero}>
        <h1 style={styles.brand}>Comply AI</h1>

        <h1 style={styles.heading}>
          AI Training Platform for Compliance Professionals
        </h1>

        <p style={styles.sub}>
          Learn how Artificial Intelligence is transforming compliance,
          insurance, fraud detection, and risk management through
          structured, real-world modules.
        </p>

        <button
  style={styles.cta}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.08)";
    e.currentTarget.style.boxShadow = "0 0 25px rgba(0,224,255,0.7)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "none";
  }}
  onMouseDown={(e) => {
    e.currentTarget.style.transform = "scale(0.95)";
  }}
  onMouseUp={(e) => {
    e.currentTarget.style.transform = "scale(1.08)";
  }}
  onClick={() => navigate("/login")}
>
  Start Learning →
</button>
      </div>

      { }
      <div style={styles.features}>

        { }
        <div
          style={styles.card}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-12px) scale(1.05)";
            e.currentTarget.style.boxShadow =
              "0 20px 50px rgba(0,224,255,0.4)";
            e.currentTarget.style.border = "1px solid #00e0ff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.border =
              "1px solid rgba(255,255,255,0.1)";
          }}
        >
          <h3>📚 Structured Learning</h3>
          <p>Step-by-step modules designed for real industry use cases</p>
        </div>

        { }
        <div
          style={styles.card}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-12px) scale(1.05)";
            e.currentTarget.style.boxShadow =
              "0 20px 50px rgba(0,224,255,0.4)";
            e.currentTarget.style.border = "1px solid #00e0ff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.border =
              "1px solid rgba(255,255,255,0.1)";
          }}
        >
          <h3>🧠 AI in Compliance</h3>
          <p>Understand real-world applications in compliance & insurance</p>
        </div>

        { }
        <div
          style={styles.card}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-12px) scale(1.05)";
            e.currentTarget.style.boxShadow =
              "0 20px 50px rgba(0,224,255,0.4)";
            e.currentTarget.style.border = "1px solid #00e0ff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.border =
              "1px solid rgba(255,255,255,0.1)";
          }}
        >
          <h3>🎓 Certification</h3>
          <p>Get certified after completing all training modules</p>
        </div>

      </div>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    color: "#fff",
    paddingBottom: "50px"
  },

  brand: {
    color: "#00e0ff",
    marginBottom: "10px"
  },

  hero: {
    textAlign: "center",
    paddingTop: "120px",
    paddingLeft: "20px",
    paddingRight: "20px"
  },

  heading: {
    fontSize: "42px",
    marginBottom: "20px"
  },

  sub: {
    maxWidth: "700px",
    margin: "auto",
    color: "#ccc",
    lineHeight: "1.6"
  },

  cta: {
    marginTop: "30px",
    padding: "14px 35px",
    background: "linear-gradient(90deg, #00e0ff, #00c3ff)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold"
  },

  features: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginTop: "100px",
    flexWrap: "wrap",
    padding: "0 20px"
  },

  card: {
    background: "rgba(255,255,255,0.05)",
    padding: "25px",
    borderRadius: "12px",
    width: "260px",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "all 0.3s ease",
    cursor: "pointer"
  }
};

export default Home;