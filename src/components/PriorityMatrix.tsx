interface PriorityMatrixProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PriorityMatrix({ isOpen, onClose }: PriorityMatrixProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Priority Matrix Guide</h2>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-1 gap-3">
              {/* P1: Urgent & Important */}
              <div className="border-2 border-red-500 rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">P1</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">DO FIRST</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-1">Urgent & Important</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Critical deadlines, crises, emergencies
                </p>
              </div>

              {/* P2: Not Urgent but Important */}
              <div className="border-2 border-orange-500 rounded-lg p-4 bg-orange-50 dark:bg-orange-900/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded">P2</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">SCHEDULE</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-1">Not Urgent but Important</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Planning, development, strategic work
                </p>
              </div>

              {/* P3: Urgent but Not Important */}
              <div className="border-2 border-yellow-500 rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded">P3</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">DELEGATE</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-1">Urgent but Not Important</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Interruptions, some emails/calls
                </p>
              </div>

              {/* P4: Not Urgent & Not Important */}
              <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">P4</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">ELIMINATE</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-1">Not Urgent & Not Important</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Time wasters, busy work, distractions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
