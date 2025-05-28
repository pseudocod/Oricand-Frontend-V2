import { forwardRef, memo } from 'react';

const Select = forwardRef(({
  label,
  error,
  className = '',
  options = [],
  placeholder = 'Select an option',
  ...props
}, ref) => {
  const baseClasses = 'w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200';
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300';
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`${baseClasses} ${errorClasses} ${className}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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

Select.displayName = 'Select';

export default memo(Select); 