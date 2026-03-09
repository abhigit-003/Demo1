import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3500);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border text-sm font-medium animate-slide-in
        ${type === 'success'
                    ? 'bg-white border-green-200 text-green-800'
                    : 'bg-white border-red-200 text-red-800'
                }`}
        >
            {type === 'success'
                ? <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            }
            <span>{message}</span>
            <button
                onClick={onClose}
                className="ml-2 p-0.5 rounded hover:bg-gray-100 transition-colors"
            >
                <X className="w-4 h-4 text-gray-400" />
            </button>
        </div>
    );
}
