import React from 'react';

export default function FormButton({
  type = "submit",
  disabled = false,
  loading = false,
  loadingText,
  children,
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className="w-full py-2 px-4 bg-black text-white font-medium rounded-xs hover:bg-white hover:text-black transition-all duration-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? loadingText : children}
    </button>
  );
} 