import { useState, useCallback } from 'react';

export const useForm = (initialValues = {}, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleBlur = useCallback((e) => {
    if (!validate) return;
    
    const { name } = e.target;
    const fieldErrors = validate({ [name]: values[name] });
    setErrors(prev => ({ ...prev, ...fieldErrors }));
  }, [validate, values]);

  const handleSubmit = useCallback(async (onSubmit) => {
    try {
      setIsSubmitting(true);
      
      // Validate all fields
      if (validate) {
        const formErrors = validate(values);
        setErrors(formErrors);
        
        if (Object.keys(formErrors).length > 0) {
          return;
        }
      }
      
      await onSubmit(values);
      
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }, [validate, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues,
    setErrors,
  };
};

// Example usage:
/*
const LoginForm = () => {
  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = 'Email is required';
    if (!values.password) errors.password = 'Password is required';
    return errors;
  };

  const { 
    values, 
    errors, 
    isSubmitting, 
    handleChange, 
    handleBlur, 
    handleSubmit 
  } = useForm({ email: '', password: '' }, validate);

  const onSubmit = async (formValues) => {
    await loginUser(formValues);
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit); }}>
      <Input
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
      />
      <Input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.password}
      />
      <Button type="submit" isLoading={isSubmitting}>
        Login
      </Button>
    </form>
  );
};
*/ 