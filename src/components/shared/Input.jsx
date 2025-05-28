import { forwardRef, memo } from 'react';

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};

const Input = forwardRef(({
  label,
  error,
  className = '',
  type = 'text',
  size = 'md',
  ...props
}, ref) => {
  const baseClasses = 'w-full border rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200';
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300';
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`${baseClasses} ${errorClasses} ${sizes[size]} ${className}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
      />
      {error && (
        <p 
          className="mt-1 text-sm text-red-600"
          id={`${props.id}-error`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default memo(Input); 