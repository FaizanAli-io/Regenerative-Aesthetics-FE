import ProductPriceFilterAccordion from './ProductPriceFilterAccordion';
import ProductSidebarAccordion from './ProductSidebarAccordion';

const items = [
  { label: 'Shampoo', count: 65 },
  { label: 'Conditioner', count: 123 },
  { label: 'Hair Serum', count: 48 },
  { label: 'Hair Oil', count: 50 },
  { label: 'Hair Spray', count: 24 },
  { label: 'Scalp Treatment', count: 8 },
];

const accordions = [
  'Hair Products',
  'Skin Products',
  'Usage Type',
  'Ingredients & Formulation',
];

export function ProductSidebar() {
  return (
    <div className='divide-y divide-gray-200'>
      <ProductPriceFilterAccordion />
      {accordions.map((title, index) => (
        <ProductSidebarAccordion key={index} items={items} title={title} />
      ))}
    </div>
  );
}

export default ProductSidebar;
