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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statuses.map((status) => (
        <div key={status} className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            {status}
          </h3>

          <div className="space-y-4">
            {grouped[status].length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No leads</p>
              </div>
            ) : (
              grouped[status].map((lead) => (
                <div
                  key={lead.id}
                  className="bg-white rounded-lg p-4 shadow-sm border-l-4"
                  style={{
                    borderLeftColor:
                      statusColors[lead.status] === "gray"
                        ? "#6B7280"
                        : statusColors[lead.status] === "blue"
                        ? "#3B82F6"
                        : "#10B981",
                  }}
                >
                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {lead.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1">{lead.email}</p>
                    <p className="text-sm text-gray-600 mb-1">{lead.phone}</p>
                    <p className="text-xs text-gray-500">
                      Source: {lead.source}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className="px-2 py-1 text-xs font-medium rounded-full text-white"
                      style={{
                        backgroundColor:
                          statusColors[lead.status] === "gray"
                            ? "#6B7280"
                            : statusColors[lead.status] === "blue"
                            ? "#3B82F6"
                            : "#10B981",
                      }}
                    >
                      {lead.status}
                    </span>

                    <select
                      value={lead.status}
                      onChange={(e) => handleChange(lead.id, e.target.value)}
                      className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeadBoard;
