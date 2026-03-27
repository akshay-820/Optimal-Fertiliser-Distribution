const Result = ({ data }) => {
    return (
        <div>
            <h2 style={{ color: "#4caf50", marginTop: 0 }}>Solution Found</h2>
            <div style={{ fontSize: "1.3rem", marginBottom: "20px" }}>
                Total Distance:{" "}
                <span style={{ color: "#ffeb3b" }}>
                    {data.total_distance} units
                </span>
            </div>

            <div style={{ marginBottom: "15px", color: "#bbb" }}>
                Optimal Path:
            </div>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    alignItems: "center",
                }}
            >
                {data.path.map((node, i) => (
                    <div
                        key={i}
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <div
                            style={{
                                padding: "12px 20px",
                                background: node === 0 ? "#4caf50" : "#333",
                                color: node === 0 ? "#000" : "#fff",
                                borderRadius: "6px",
                                fontWeight: "bold",
                                border: "1px solid #4caf50",
                            }}
                        >
                            {node === 0 ? "DEPOT" : `FARM ${node}`}
                        </div>
                        {i < data.path.length - 1 && (
                            <span
                                style={{
                                    color: "#4caf50",
                                    fontSize: "1.5rem",
                                    margin: "0 5px",
                                }}
                            >
                                ➔
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Result;
