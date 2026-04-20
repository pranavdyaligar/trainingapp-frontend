import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Certificate() {
  const certRef = useRef();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const downloadPDF = () => {
    html2canvas(certRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("landscape", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
      pdf.save("Comply_AI_Certificate.pdf");
    });
  };

  return (
    <div style={styles.page}>
      
      <div ref={certRef} style={styles.certificate}>
        <div style={styles.inner}>
          
          <h1 style={styles.title}>Certificate of Completion</h1>

          <p style={styles.sub}>This certificate is proudly presented to</p>

          <h2 style={styles.name}>
            {(user?.name || "USER NAME").toUpperCase()}
          </h2>

          <p style={styles.text}>for successfully completing the</p>

          <h3 style={styles.course}>AI Training Program</h3>

          <p style={styles.text}>
            conducted by <span style={styles.brand}>COMPLY AI</span>
          </p>

          <div style={styles.footer}>
            <div>
              <div style={styles.line}></div>
              <p>Authorized Signature</p>
            </div>

            <div>
              <p>{new Date().toLocaleDateString()}</p>
              <p>Date</p>
            </div>
          </div>

        </div>
      </div>

      <div style={styles.actions}>
        <button style={styles.downloadBtn} onClick={downloadPDF}>
          Download Certificate
        </button>

        <button
          style={styles.backBtn}
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  certificate: {
    width: "900px",
    height: "480px",
    background: "#fff",
    borderRadius: "10px",
    padding: "12px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    boxSizing: "border-box", 
  },

  inner: {
    height: "100%",
    border: "5px solid gold",
    borderRadius: "8px",
    padding: "40px",
    textAlign: "center",
    boxSizing: "border-box", 
  },

  title: {
    fontSize: "30px",
    marginBottom: "10px",
  },

  sub: {
    fontSize: "13px",
    color: "#666",
  },

  name: {
    fontSize: "28px",
    margin: "15px 0",
    fontWeight: "bold",
    color: "#2c5364",
  },

  text: {
    fontSize: "15px",
    color: "#444",
  },

  course: {
    fontSize: "20px",
    margin: "8px 0",
    fontWeight: "bold",
  },

  brand: {
    color: "#00c3ff",
    fontWeight: "bold",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "40px",
    padding: "0 30px",
  },

  line: {
    width: "180px",
    height: "1px",
    background: "#000",
    marginBottom: "5px",
  },

  actions: {
    marginTop: "40px",
    display: "flex",
    gap: "20px",
  },

  downloadBtn: {
    padding: "12px 25px",
    background: "#00c3ff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  backBtn: {
    padding: "12px 25px",
    background: "#444",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Certificate;