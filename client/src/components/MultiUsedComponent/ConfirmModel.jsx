import React from 'react';

const ConfirmModel = ({
    isOpen,
    title = "Are you sure?",
    message = "This action cannot be undone.",
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
    className = ''
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-400/60 bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 border border-gray-100 overflow-hidden">
                <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <p className="mt-3 text-gray-600 text-[15px] leading-snug">{message}</p>
                </div>

                <div className="bg-gray-50 px-5 py-4 flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="px-6 py-3 cursor-pointer text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-[15px] font-medium"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-6 py-3 cursor-pointer text-white rounded-lg transition-colors text-[15px] font-medium ${className || 'bg-red-600 hover:bg-red-700'}`}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModel;