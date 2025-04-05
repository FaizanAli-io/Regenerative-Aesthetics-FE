import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import SearchField from '../components/SearchField';
import { Category } from '@/lib/services/category-services';

interface Props {
  items: Category[];
  title: string;
}

function ProductSidebarAccordion({ items, title }: Props) {
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
          {items.map(item => (
            <div className='flex items-center space-x-2'>
              <Checkbox
                // id={item.label.replace(' ', '_')}
                className='cursor-pointer'
              />
              <label
                // htmlFor={item.label.replace(' ', '_')}
                className='text-primary-darker text-sm font-medium leading-none cursor-pointer'
              >
                {item.title}
                <span className='text-xs text-neutral-400 font-normal ml-1'>
                  {/* {item.count} */}
                </span>
              </label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default ProductSidebarAccordion;
