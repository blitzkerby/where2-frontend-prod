const DeleteConfirmationModal = ({ show, onClose, onConfirm, warningMsg, type }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">{type}</h2>
          <p className="text-gray-600 mb-6">{warningMsg}</p>
          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;