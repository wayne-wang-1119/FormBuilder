import React, { useState } from "react";

function ReportGenerator() {
  const [formId, setFormId] = useState("");
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const fetchReport = async () => {
    try {
      const response = await fetch(`/process/forms/${formId}`);
      if (!response.ok) {
        throw new Error("Form not found or an error occurred.");
      }
      const data = await response.json();
      setReport(data.response); // Adjust according to your actual response structure
      setError("");
    } catch (err) {
      setError(err.message);
      setReport(null);
    }
  };

  return (
    <div>
      <h1>Report Generator</h1>
      <input
        type="text"
        value={formId}
        onChange={(e) => setFormId(e.target.value)}
        placeholder="Enter Form ID"
      />
      <button onClick={fetchReport}>Generate Report</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {report && (
        <div>
          <pre>{JSON.stringify(report, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ReportGenerator;
