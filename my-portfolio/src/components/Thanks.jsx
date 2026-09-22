import { motion } from 'framer-motion';

export default function Thanks() {
  return (
    <div style={{
      fontFamily: "'Poppins', sans-serif",
      background: "linear-gradient(180deg, #07111f 0%, #030814 100%)",
      color: "#f3f7fb",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "24px"
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          maxWidth: "480px",
          padding: "48px 40px",
          background: "rgba(10, 21, 41, 0.78)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: "32px"
        }}
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 200 }}
          style={{
            width: "64px", height: "64px",
            margin: "0 auto 24px",
            borderRadius: "50%",
            background: "rgba(73, 220, 177, 0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.8rem",
            color: "#49dcb1"
          }}
        >
          ✓
        </motion.div>
        <h1 style={{ fontSize: "1.8rem", marginBottom: "12px" }}>Message Sent!</h1>
        <p style={{ color: "#a6b4c8", lineHeight: "1.75", marginBottom: "32px" }}>
          Thanks for reaching out. I'll get back to you as soon as possible.
        </p>
        <a href="/" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "14px 28px",
          borderRadius: "999px",
          background: "linear-gradient(135deg, #49dcb1, #1fa2ff)",
          color: "#02111c",
          textDecoration: "none",
          fontWeight: "700",
          boxShadow: "0 14px 32px rgba(31,162,255,.22)"
        }}>← Back to Portfolio</a>
      </motion.div>
    </div>
  );
}