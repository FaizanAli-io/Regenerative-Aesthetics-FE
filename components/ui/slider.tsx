'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

interface RangeSliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  value?: [number, number];
  defaultValue?: [number, number];
  min?: number;
  max?: number;
}

function RangeSlider({
  className,
  defaultValue = [0, 100],
  value,
  min = 0,
  max = 100,
  onValueChange,
  ...props
}: RangeSliderProps) {
  const [_values, setValues] = React.useState<[number, number]>(
    value || defaultValue
  );

  React.useEffect(() => {
    if (value) setValues(value);
  }, [value]);

  const handleChange = (newValues: [number, number]) => {
    setValues(newValues);
    onValueChange?.(newValues);
  };

  return (
    <SliderPrimitive.Root
      data-slot='slider'
      value={_values}
      onValueChange={handleChange}
      min={min}
      max={max}
      className={cn(
        'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      {/* Track */}
      <SliderPrimitive.Track
        data-slot='slider-track'
        className='bg-muted relative grow overflow-hidden rounded-full h-1'
      >
        {/* Active Range */}
        <SliderPrimitive.Range
          data-slot='slider-range'
          className='bg-primary-darker absolute h-full'
        />
      </SliderPrimitive.Track>

      {/* Thumbs for Min & Max */}
      {_values.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          data-slot='slider-thumb'
          className='border-primary-darker bg-primary-darker ring-ring/50 block size-3 shrink-0 rounded-full border shadow-sm transition-all hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 cursor-pointer'
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { RangeSlider as Slider };
