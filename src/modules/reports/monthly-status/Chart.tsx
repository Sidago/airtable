"use client";
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';

const data = [
  { name: 'TOM SILVER', points: 0, wins: 0 },
  { name: 'MARIZ CABIDO', points: 1025, wins: 3 },
  { name: 'CHRIS MOORE', points: 874, wins: 5 },
  { name: 'BRYAN TAYLOR', points: 1059, wins: 0 },
  { name: 'BRYAN MILLER', points: 0, wins: 1 },
];

const Chart = () => {
  return (
    <div className="flex flex-col mt-10 mb-10 md:flex-row gap-6">
      
      {/* Monthly Points Chart */}
      <div className="flex-1 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 px-2">Monthly Points</h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 0" vertical={false} stroke="#eee" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                interval={0} 
                tick={{ fontSize: 12, fill: '#666' }}
                height={70}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="points" radius={[2, 2, 0, 0]} barSize={60}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.name === 'BRYAN TAYLOR' ? '#008000' : '#e60039'} />
                ))}
                <LabelList dataKey="points" position="top" style={{ fontSize: '12px', fill: '#666' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Historical Wins Chart */}
      <div className="flex-1 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 px-2">Historical Wins</h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 0" vertical={false} stroke="#eee" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                interval={0} 
                tick={{ fontSize: 12, fill: '#666' }}
                height={70}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} domain={[0, 5]} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="wins" fill="#2ca02c" radius={[2, 2, 0, 0]} barSize={60}>
                <LabelList dataKey="wins" position="top" style={{ fontSize: '12px', fill: '#666' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default Chart;