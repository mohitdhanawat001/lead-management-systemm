import React from "react";
import API from "../api";

const statuses = ["New Lead", "Lead Sent", "Deal Done"];
const statusColors = {
  "New Lead": "gray",
  "Lead Sent": "blue",
  "Deal Done": "green",
};

const LeadBoard = ({ leads, onStatusChange }) => {
  const grouped = {};
  statuses.forEach((status) => (grouped[status] = []));
  leads.forEach((lead) => grouped[lead.status]?.push(lead));

  const handleChange = async (id, status) => {
    const res = await API.put(`/leads/${id}`, { status });
    onStatusChange(res.data);
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {statuses.map((status) => (
        <div key={status}>
          <h3>{status}</h3>
          {grouped[status].map((lead) => (
            <div
              key={lead.id}
              style={{
                border: `2px solid ${statusColors[lead.status]}`,
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <p>
                {lead.name} - {lead.email}
              </p>
              <select
                value={lead.status}
                onChange={(e) => handleChange(lead.id, e.target.value)}
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LeadBoard;
