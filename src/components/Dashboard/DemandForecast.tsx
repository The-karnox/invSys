import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Simulated forecast data
const forecastData = [
  { month: 'Jan', actual: 4500, predicted: 4600 },
  { month: 'Feb', actual: 3800, predicted: 3900 },
  { month: 'Mar', actual: 4200, predicted: 4100 },
  { month: 'Apr', actual: 3600, predicted: 3800 },
  { month: 'May', actual: 4100, predicted: 4200 },
  { month: 'Jun', actual: 3900, predicted: 4000 },
];

export function DemandForecast() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">Demand Forecast</h2>
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#eb5e28"
              strokeWidth={2}
              dot={{ fill: '#eb5e28', r: 4 }}
              name="Actual Sales"
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#3b82f6', r: 4 }}
              name="Predicted Sales"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="text-green-700 font-medium">Accuracy Score</p>
          <p className="text-green-900 text-lg font-semibold">94.8%</p>
        </div>
        <div className="p-3 bg-orange-50 rounded-lg">
          <p className="text-orange-700 font-medium">Next Restock</p>
          <p className="text-orange-900 text-lg font-semibold">7 days</p>
        </div>
      </div>
    </div>
  );
}