#!/bin/bash

# Create new directory structure
mkdir -p src/features/admin/{products,categories,attributes}/components
mkdir -p src/features/admin/{products,categories,attributes}/hooks
mkdir -p src/features/admin/{products,categories,attributes}/services

mkdir -p src/features/auth/components
mkdir -p src/features/auth/hooks
mkdir -p src/features/auth/services

mkdir -p src/features/drops/components
mkdir -p src/features/drops/hooks
mkdir -p src/features/drops/services

mkdir -p src/components/shared
mkdir -p src/components/layout
mkdir -p src/components/ui

mkdir -p src/hooks/common
mkdir -p src/hooks/form
mkdir -p src/hooks/ui

mkdir -p src/utils/{api,form,validation}

# Move files to their new locations
mv src/components/admin/forms/ProductForm.jsx src/features/admin/products/components/
mv src/components/admin/forms/CategoryForm.jsx src/features/admin/categories/components/
mv src/components/admin/forms/AttributeTypeForm.jsx src/features/admin/attributes/components/
mv src/components/admin/forms/AttributeOptionForm.jsx src/features/admin/attributes/components/

mv src/components/ui/Input.jsx src/components/shared/
mv src/components/ui/Button.jsx src/components/shared/
mv src/components/ui/Select.jsx src/components/shared/
mv src/components/ui/LazyImage.jsx src/components/shared/
mv src/components/ui/LoadingSpinner.jsx src/components/shared/

mv src/hooks/useForm.js src/hooks/form/
mv src/hooks/useFocusTrap.js src/hooks/ui/
mv src/hooks/useKeyboardNav.js src/hooks/ui/
mv src/hooks/useImageLazyLoad.js src/hooks/ui/

mv src/components/layout/MainLayout.jsx src/components/layout/
mv src/components/navigation/SidebarHeader.jsx src/components/layout/

# Clean up empty directories
find src -type d -empty -delete 