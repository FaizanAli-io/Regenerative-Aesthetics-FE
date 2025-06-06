import SearchField from '@/app/components/SearchField';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Category } from '@/lib/services/category-services';
import { useProductsStore } from '@/lib/stores/products-store';
import { useEffect } from 'react';

interface Props {
  items: Category[];
  title: string;
}

function ProductSidebarAccordion({ items, title }: Props) {
  const categories = useProductsStore(state => state.categoryFilter);
  const setCategoryFilter = useProductsStore(state => state.setCategoryFilter);

  useEffect(() => {
    items.forEach(item => setCategoryFilter(item.title, true));
  }, [items, setCategoryFilter]);

  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccordionItem value={title}>
        <AccordionTrigger className='cursor-pointer text-[1rem] text-primary-darker'>
          {title}
        </AccordionTrigger>
        <AccordionContent className='space-y-4 px-2'>
          <div className='pt-2'>
            <SearchField />
          </div>
          {items.map(item => {
            return (
              <div className='flex items-center space-x-2' key={item.id}>
                <Checkbox
                  className='cursor-pointer'
                  checked={categories[item.title]}
                  onCheckedChange={checked =>
                    setCategoryFilter(item.title, !!checked)
                  }
                />
                <label className='text-primary-darker text-sm font-medium leading-none cursor-pointer'>
                  {item.title}
                </label>
              </div>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default ProductSidebarAccordion;
