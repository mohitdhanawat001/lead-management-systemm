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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            value={lead.name}
            onChange={(e) => setLead({ ...lead, name: e.target.value })}
            placeholder="Enter lead name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone *
          </label>
          <input
            type="tel"
            value={lead.phone}
            onChange={(e) => setLead({ ...lead, phone: e.target.value })}
            placeholder="Enter phone number"
            required
            pattern="[0-9]{10}"
            title="Pleae Enter Complete Phone number"
            maxLength={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            value={lead.email}
            onChange={(e) => setLead({ ...lead, email: e.target.value })}
            placeholder="Enter email address"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lead Source *
          </label>
          <input
            type="text"
            value={lead.source}
            onChange={(e) => setLead({ ...lead, source: e.target.value })}
            placeholder="e.g., Website, Referral, Social Media"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Add Lead
        </button>
      </div>
    </form>
  );
};

export default LeadForm;
