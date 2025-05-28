// Public Pages
export * from './pages';

// Public Services
export * from './services';

// Routes (if needed by the main app router)
export { default as AdminRoutes } from './routes';

// Pages
export { default as DashboardAdmin } from './pages/DashboardAdmin';
export { default as ProductAdmin } from './pages/ProductAdmin';
export { default as CategoryAdmin } from './pages/CategoryAdmin';
export { default as AttributeTypeAdmin } from './pages/AttributeTypeAdmin';
export { default as AttributeTypes } from './pages/AttributeTypes';
export { default as AttributeOptionAdmin } from './pages/AttributeOptionAdmin';
export { default as SelectedAttributeAdmin } from './pages/SelectedAttributeAdmin';

// Services
export { default as productService } from './services/productService';
export { default as categoryService } from './services/categoryService';
export { default as attributeOptionService } from './services/attributeOptionService';
export { default as selectedAttributeService } from './services/selectedAttributeService';
export { default as attributeTypeService } from './services/attributeTypeService'; 