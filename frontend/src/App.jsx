import { useState } from "react";
import InputForm from "./components/InputForm";
import Result from "./components/Result";

function App() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#121212", // Deep Dark Background
                color: "#ffffff",
                padding: "40px 20px",
                fontFamily: "sans-serif",
            }}
        >
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                <header style={{ textAlign: "center", marginBottom: "40px" }}>
                    <h1 style={{ color: "#4caf50", fontSize: "2.5rem" }}>
                        🌿 ACO Fertilizer Optimizer
                    </h1>
                    <p style={{ color: "#bbb" }}>
                        Academic Project: Ant Colony Optimization Logic
                    </p>
                </header>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: "30px",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#1e1e1e",
                            padding: "30px",
                            borderRadius: "12px",
                            border: "1px solid #333",
                        }}
                    >
                        <InputForm
                            onCalculate={(data) => {
                                setResult(data);
                                setLoading(false);
                            }}
                            setLoading={setLoading}
                        />
                    </div>

                    {loading && (
                        <h2 style={{ textAlign: "center", color: "#4caf50" }}>
                            🐜 Ants are calculating...
                        </h2>
                    )}

                    {result && !loading && (
                        <div
                            style={{
                                backgroundColor: "#1e1e1e",
                                padding: "30px",
                                borderRadius: "12px",
                                border: "1px solid #4caf50",
                            }}
                        >
                            <Result data={result} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
