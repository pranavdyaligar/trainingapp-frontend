import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ModulePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [module, setModule] = useState(null);

  
  useEffect(() => {
    axios
      .get("https://trainingapp-backend.onrender.com/api/modules") 
      .then((res) => {
        console.log("API DATA:", res.data);

        const modules = res.data;

        
        const selected = modules.find(
          (_, index) => index === Number(id) - 1
        );

        console.log("SELECTED MODULE:", selected);

        setModule(selected);
      })
      .catch((err) => {
        console.log("Error fetching modules:", err);
      });
  }, [id]);

 
  if (!module) {
    return <h2 style={{ color: "white" }}>Loading...</h2>;
  }

 
  const completeModule = () => {
    let completed = JSON.parse(localStorage.getItem("completed")) || [];

    if (!completed.includes(id)) {
      completed.push(id);
      localStorage.setItem("completed", JSON.stringify(completed));
    }

    alert("Module Completed!");
  };

  return (
    <div style={styles.container}>
      <h1>{module.title}</h1>
      <p style={styles.desc}>{module.description}</p>

      {/* 📊 PRESENTATIONS/PPTs */}
      <div style={styles.pptWrapper}>
        <h3 style={{ marginTop: "30px", marginBottom: "15px" }}>Presentations</h3>
        {module.ppts && module.ppts.length > 0 ? (
          module.ppts.map((ppt, index) => (
            <div key={index} style={{ marginBottom: "30px" }}>
              <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(ppt)}`}
                width="100%"
                height="600"
                frameBorder="0"
                allowFullScreen
                title={`presentation-${index}`}
                style={{
                  borderRadius: "10px",
                  border: "1px solid #555",
                }}
              ></iframe>
              <p style={{ marginTop: "10px", fontSize: "14px", color: "#aaa" }}>
                <a href={ppt} download style={{ color: "#00c3ff", textDecoration: "none" }}>
                  ⬇️ Download
                </a>
              </p>
            </div>
          ))
        ) : (
          <p>No presentations available</p>
        )}
      </div>

      {/* 🎥 MULTIPLE VIDEOS */}
      <div style={styles.videoWrapper}>
        <h3 style={{ marginTop: "30px", marginBottom: "15px" }}>Videos</h3>
        {module.videos && module.videos.length > 0 ? (
          module.videos.map((video, index) => (
            <iframe
              key={index}
              width="100%"
              height="300"
              src={video}
              title={`video-${index}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                marginBottom: "20px",
                borderRadius: "10px",
              }}
            ></iframe>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </div>

      { }
      <button style={styles.completeBtn} onClick={completeModule}>
        Mark as Completed
      </button>

      { }
      <div style={styles.nav}>
        {Number(id) > 1 && (
          <button
            style={styles.navBtn}
            onClick={() => navigate(`/module/${Number(id) - 1}`)}
          >
            ← Previous
          </button>
        )}

        {Number(id) < 5 && (
          <button
            style={styles.navBtn}
            onClick={() => navigate(`/module/${Number(id) + 1}`)}
          >
            Next →
          </button>
        )}
      </div>

      { }
      <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
}


const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
    color: "#fff",
    padding: "40px",
    textAlign: "center",
  },

  desc: {
    color: "#ccc",
    marginBottom: "20px",
  },

  pptWrapper: {
    maxWidth: "900px",
    margin: "auto",
    marginBottom: "20px",
  },

  videoWrapper: {
    maxWidth: "800px",
    margin: "auto",
    marginBottom: "20px",
  },

  completeBtn: {
    padding: "12px 20px",
    background: "#00c3ff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: "20px",
  },

  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },

  navBtn: {
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },

  backBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "#555",
    color: "#fff",
    cursor: "pointer",
  },
};

export default ModulePage;