'use client';

import { useState } from 'react';

export default function PriorityMatrix() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-6 bg-white border rounded-lg shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50"
      >
        <h2 className="text-lg font-semibold text-gray-900">Priority Matrix Guide</h2>
        <span className="text-gray-500">{isExpanded ? '▼' : '▶'}</span>
      </button>

      {isExpanded && (
        <div className="p-4 border-t">
          <div className="grid grid-cols-2 gap-3">
            {/* P1: Urgent & Important */}
            <div className="border-2 border-red-500 rounded-lg p-4 bg-red-50">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">P1</span>
                <span className="font-semibold text-gray-900">DO FIRST</span>
              </div>
              <p className="text-sm text-gray-700 font-medium mb-1">Urgent & Important</p>
              <p className="text-xs text-gray-600">
                Critical deadlines, crises, emergencies
              </p>
            </div>

            {/* P2: Not Urgent but Important */}
            <div className="border-2 border-orange-500 rounded-lg p-4 bg-orange-50">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded">P2</span>
                <span className="font-semibold text-gray-900">SCHEDULE</span>
              </div>
              <p className="text-sm text-gray-700 font-medium mb-1">Not Urgent but Important</p>
              <p className="text-xs text-gray-600">
                Planning, development, strategic work
              </p>
            </div>

            {/* P3: Urgent but Not Important */}
            <div className="border-2 border-yellow-500 rounded-lg p-4 bg-yellow-50">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded">P3</span>
                <span className="font-semibold text-gray-900">DELEGATE</span>
              </div>
              <p className="text-sm text-gray-700 font-medium mb-1">Urgent but Not Important</p>
              <p className="text-xs text-gray-600">
                Interruptions, some emails/calls
              </p>
            </div>

            {/* P4: Not Urgent & Not Important */}
            <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">P4</span>
                <span className="font-semibold text-gray-900">ELIMINATE</span>
              </div>
              <p className="text-sm text-gray-700 font-medium mb-1">Not Urgent & Not Important</p>
              <p className="text-xs text-gray-600">
                Time wasters, busy work, distractions
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
