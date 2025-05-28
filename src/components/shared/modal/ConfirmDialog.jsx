import { Button } from '@/components/shared/Button';

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-30" onClick={onClose} />
        
        {/* Dialog */}
        <div className="relative bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          <p className="text-gray-600 mb-6">{message}</p>
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={onClose}
              size="sm"
            >
              {cancelText}
            </Button>
            <Button
              variant={variant}
              onClick={onConfirm}
              size="sm"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}; 