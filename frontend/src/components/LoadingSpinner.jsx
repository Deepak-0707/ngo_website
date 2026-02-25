const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-4">
    <div className="w-10 h-10 border-4 border-forest-500 border-t-transparent rounded-full animate-spin" />
    <p className="font-body text-stone-400 text-sm">{message}</p>
  </div>
);

export default LoadingSpinner;
