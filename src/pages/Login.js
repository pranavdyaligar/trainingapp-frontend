import { useState, useRef, useEffect } from "react";
import axios from "axios";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const timeoutRef = useRef(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const API = " https://trainingapp-backend.onrender.com";

  // refs for Enter navigation (NO auto submit except on last field)
  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const confirmRef = useRef();

  const focusNext = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef?.current?.focus();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async () => {
    setMessage("");

    try {
      if (isLogin) {
        
        if (!email || !password) {
          return setMessage("Enter email and password");
        }

        const res = await axios.post(`${API}/api/users/login`, {
          email,
          password,
        });

        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.href = "/dashboard";
      } else {
        
        if (!name || !phone || !email || !password) {
          return setMessage("All fields are required");
        }

        if (!/^\d{10}$/.test(phone)) {
          return setMessage("Phone must be exactly 10 digits");
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
          return setMessage("Enter a valid email");
        }

        if (password !== confirmPassword) {
          return setMessage("Passwords do not match");
        }

        const regex = /^[A-Z].{7,}\d{2}$/;
        if (!regex.test(password)) {
          return setMessage(
            "Password must be min 10 chars, start with capital & end with 2 numbers"
          );
        }

        await axios.post(`${API}/api/users/register`, {
          name,
          phone,
          email,
          password,
        });

        setMessage("Signup successful! Please login.");

        timeoutRef.current = window.setTimeout(() => {
          setIsLogin(true);
          setMessage("");
        }, 2000);
      }
    } catch (err) {
      setMessage(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        <h1 style={styles.brand}>Comply AI</h1>
        <p style={styles.tagline}>
          Smart Training for Compliance Professionals
        </p>

        <h2>{isLogin ? "Login" : "Create Account"}</h2>

        {!isLogin && (
          <>
            {/* NAME */}
            <input
              ref={nameRef}
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value.replace(/[^a-zA-Z\s]/g, ""))
              }
              onKeyDown={(e) => focusNext(e, phoneRef)}
            />

            { }
            <input
              ref={phoneRef}
              style={styles.input}
              placeholder="Phone Number"
              value={phone}
              maxLength={10}
              inputMode="numeric"
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, ""))
              }
              onKeyDown={(e) => focusNext(e, emailRef)}
            />
          </>
        )}

        { }
        <input
          ref={emailRef}
          style={styles.input}
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => focusNext(e, passRef)}
        />

        { }
        <input
          ref={passRef}
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (isLogin) {
                handleSubmit(); 
              } else {
                focusNext(e, confirmRef);
              }
            }
          }}
        />

        { }
        {!isLogin && (
          <input
            ref={confirmRef}
            style={styles.input}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
          />
        )}

        { }
        {message && (
          <p
            style={{
              ...styles.message,
              color: message.includes("successful") ? "#00ff9d" : "#ff4d4d",
              borderColor: message.includes("successful")
                ? "rgba(0,255,157,0.4)"
                : "rgba(255,77,77,0.4)",
              background: message.includes("successful")
                ? "rgba(0,255,157,0.1)"
                : "rgba(255,77,77,0.1)",
            }}
          >
            {message}
          </p>
        )}

        <button style={styles.button} onClick={handleSubmit}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p style={{ marginTop: "10px" }}>
          {isLogin ? "New here?" : "Already have account?"}{" "}
          <span
            style={styles.link}
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage(""); 
            }}
          >
            {isLogin ? "Create Account" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background:
      "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1500&q=80') no-repeat center/cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    fontFamily: "Segoe UI",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,50,80,0.8))",
  },

  card: {
    position: "relative",
    backdropFilter: "blur(20px)",
    background: "rgba(255, 255, 255, 0.08)",
    padding: "45px",
    borderRadius: "18px",
    width: "360px",
    color: "#fff",
    textAlign: "center",
    boxShadow: "0 15px 50px rgba(0, 224, 255, 0.2)",
    border: "1px solid rgba(255,255,255,0.15)",
  },

  brand: {
    color: "#00e0ff",
    fontSize: "28px",
    fontWeight: "bold",
  },

  tagline: {
    fontSize: "12px",
    marginBottom: "20px",
    color: "#aaa",
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.2)",
    outline: "none",
    background: "rgba(255,255,255,0.1)",
    color: "#fff",
  },

  message: {
    padding: "8px",
    borderRadius: "6px",
    fontSize: "13px",
    marginTop: "10px",
    border: "1px solid",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(90deg, #00e0ff, #00c3ff)",
    border: "none",
    borderRadius: "8px",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },

  link: {
    color: "#00e0ff",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;