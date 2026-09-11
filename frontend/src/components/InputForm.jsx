import { useState } from "react";

const InputForm = ({ onCalculate, setLoading }) => {
    const [capacity, setCapacity] = useState("");
    const [farms, setFarms] = useState([
        { x: 0, y: 0, demand: 0 }, // Depot
        { x: "", y: "", demand: "" }, // Empty Farm 1
    ]);

    const addFarm = () => setFarms([...farms, { x: "", y: "", demand: "" }]);
    const updateFarm = (index, field, val) => {
        const newFarms = [...farms];
        newFarms[index][field] = val === "" ? "" : parseInt(val);
        setFarms(newFarms);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch("http://localhost:5000/optimize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                farms,
                capacity: parseInt(capacity) || 100,
            }),
        });
        const data = await res.json();
        onCalculate(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "30px" }}>
                <h3 style={{ color: "#4caf50" }}>1. System Configuration</h3>
                <label
                    style={{
                        display: "block",
                        marginBottom: "10px",
                        fontWeight: "bold",
                    }}
                >
                    Vehicle Cap:
                </label>
                <input
                    type="number"
                    placeholder="e.g. 500"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    style={inputStyle}
                />
            </div>

            <h3 style={{ color: "#4caf50" }}>2. Node Definitions</h3>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    gap: "15px",
                    marginBottom: "10px",
                    color: "#888",
                    fontWeight: "bold",
                }}
            >
                <div>Location</div>
                <div>X</div>
                <div>Y</div>
                <div>Demand</div>
            </div>

            {farms.map((farm, i) => (
                <div
                    key={i}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr",
                        gap: "15px",
                        marginBottom: "10px",
                    }}
                >
                    <span
                        style={{
                            color: i === 0 ? "#4caf50" : "#fff",
                            fontWeight: "bold",
                        }}
                    >
                        {i === 0 ? "📍 Depot" : `Farm ${i}`}
                    </span>
                    <input
                        type="number"
                        placeholder="0"
                        value={farm.x}
                        onChange={(e) => updateFarm(i, "x", e.target.value)}
                        style={inputStyle}
                    />
                    <input
                        type="number"
                        placeholder="0"
                        value={farm.y}
                        onChange={(e) => updateFarm(i, "y", e.target.value)}
                        style={inputStyle}
                    />
                    <input
                        type="number"
                        placeholder="0"
                        value={farm.demand}
                        disabled={i === 0}
                        onChange={(e) =>
                            updateFarm(i, "demand", e.target.value)
                        }
                        style={{
                            ...inputStyle,
                            backgroundColor: i === 0 ? "#444" : "#fff",
                        }}
                    />
                </div>
            ))}

            <button type="button" onClick={addFarm} style={btnSecondary}>
                + Add Farm
            </button>
            <button type="submit" style={btnPrimary}>
                RUN OPTIMIZATION
            </button>
        </form>
    );
};

const inputStyle = {
    padding: "12px",
    borderRadius: "4px",
    border: "none",
    width: "100%",
    color: "#000",
    backgroundColor: "#fff",
    fontSize: "1rem",
};
const btnPrimary = {
    width: "100%",
    marginTop: "20px",
    padding: "15px",
    background: "#4caf50",
    color: "#000",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1.1rem",
};
const btnSecondary = {
    background: "transparent",
    border: "1px solid #4caf50",
    color: "#4caf50",
    padding: "8px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
};

export default InputForm;
