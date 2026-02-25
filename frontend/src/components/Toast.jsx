import { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeStyles = {
    success: 'bg-forest-700 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-stone-700 text-white',
  };

  const icons = { success: '✓', error: '✕', info: 'ℹ' };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg animate-fade-up font-body text-sm max-w-sm ${typeStyles[type]}`}
    >
      <span className="font-bold text-base">{icons[type]}</span>
      <p>{message}</p>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100 transition-opacity">
        ✕
      </button>
    </div>
  );
};

export const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const hideToast = () => setToast(null);

  const ToastComponent = toast ? (
    <Toast message={toast.message} type={toast.type} onClose={hideToast} />
  ) : null;

  return { showToast, ToastComponent };
};

export default Toast;
