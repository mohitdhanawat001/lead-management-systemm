import React, { useEffect, useState } from "react";
import API from "../api";
import LeadForm from "./LeadForm";
import LeadBoard from "./LeadBoard";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    API.get("/leads").then((res) => setLeads(res.data));
  }, []);

  const addLead = (lead) => setLeads([...leads, lead]);
  const updateLead = (updated) =>
    setLeads(leads.map((l) => (l.id === updated.id ? updated : l)));

  return (
    <div>
      <h2>Dashboard</h2>
      <LeadForm onAdd={addLead} />
      <LeadBoard leads={leads} onStatusChange={updateLead} />
    </div>
  );
};

export default Dashboard;
