export default function Light({ isOn, color }) {
  return (
    <div
      style={{
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        margin: "10px",
        backgroundColor: isOn ? color : "#333",
        boxShadow: isOn ? `0 0 20px ${color}` : "none",
        transition: "all 0.3s ease",
      }}
    />
  );
}
 