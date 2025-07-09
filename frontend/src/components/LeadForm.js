import React, { useState } from "react";
import API from "../api";

const LeadForm = ({ onAdd }) => {
  const [lead, setLead] = useState({
    name: "",
    phone: "",
    email: "",
    source: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/leads", lead);
    onAdd(res.data);
    setLead({ name: "", phone: "", email: "", source: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={lead.name}
        onChange={(e) => setLead({ ...lead, name: e.target.value })}
        placeholder="Name"
        required
      />
      <input
        value={lead.phone}
        onChange={(e) => setLead({ ...lead, phone: e.target.value })}
        placeholder="Phone"
        required
      />
      <input
        value={lead.email}
        onChange={(e) => setLead({ ...lead, email: e.target.value })}
        placeholder="Email"
        required
      />
      <input
        value={lead.source}
        onChange={(e) => setLead({ ...lead, source: e.target.value })}
        placeholder="Lead Source"
        required
      />
      <button type="submit">Add Lead</button>
    </form>
  );
};

export default LeadForm;
