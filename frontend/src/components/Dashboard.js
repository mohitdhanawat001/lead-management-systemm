import React, { useEffect, useState } from "react";
import API from "../api";
import LeadForm from "./LeadForm";
import LeadBoard from "./LeadBoard";

const Dashboard = ({ setToken }) => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    API.get("/leads").then((res) => setLeads(res.data));
  }, []);

  const addLead = (lead) => setLeads([...leads, lead]);
  const updateLead = (updated) =>
    setLeads(leads.map((l) => (l.id === updated.id ? updated : l)));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Lead Management Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Add New Lead
            </h2>
          </div>
          <div className="px-6 py-4">
            <LeadForm onAdd={addLead} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Lead Status Tracker
            </h2>
          </div>
          <div className="px-6 py-4">
            <LeadBoard leads={leads} onStatusChange={updateLead} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
