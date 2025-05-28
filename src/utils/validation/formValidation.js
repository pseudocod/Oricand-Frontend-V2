export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return '';
};

export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email format';
  }
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
    return 'Password must contain uppercase, lowercase, number and special character';
  }
  
  return '';
};

export const validateNumber = (value, fieldName, { min, max } = {}) => {
  if (!value) return `${fieldName} is required`;
  
  const num = Number(value);
  if (isNaN(num)) {
    return `${fieldName} must be a number`;
  }
  
  if (typeof min === 'number' && num < min) {
    return `${fieldName} must be at least ${min}`;
  }
  
  if (typeof max === 'number' && num > max) {
    return `${fieldName} must be less than ${max}`;
  }
  
  return '';
};

export const validateUrl = (url) => {
  if (!url) return '';
  
  try {
    new URL(url);
    return '';
  } catch {
    return 'Invalid URL format';
  }
};

export const validateFileSize = (file, maxSizeMB) => {
  if (!file) return '';
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return `File size must be less than ${maxSizeMB}MB`;
  }
  
  return '';
};

export const validateFileType = (file, allowedTypes) => {
  if (!file) return '';
  
  if (!allowedTypes.includes(file.type)) {
    return `File type must be one of: ${allowedTypes.join(', ')}`;
  }
  
  return '';
}; 