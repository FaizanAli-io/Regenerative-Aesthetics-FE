'use client';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepperProps {
  steps: {
    id: string;
    label: string;
    text: string;
    icon?: React.ReactNode;
  }[];
  activeStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
}

function Stepper({ steps, activeStep, onStepClick, className }: StepperProps) {
  return (
    <div className={cn('w-full', className)}>
      <ol className='flex items-center w-full'>
        {steps.map((step, index) => {
          const isActive = activeStep === index;
          const isCompleted = activeStep > index;
          const isLast = index === steps.length - 1;

          return (
            <li
              key={step.id}
              className={cn('flex items-center', !isLast && 'w-full')}
            >
              <div className='flex  items-center space-x-3'>
                <button
                  type='button'
                  onClick={() => onStepClick?.(index)}
                  className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full border-2 shrink-0',
                    isActive &&
                      'border-primary-variant2 bg-primary-variant2 text-primary-variant2-foreground',
                    isCompleted &&
                      'border-primary-variant2 bg-primary-variant2 text-primary-variant2-foreground',
                    !isActive && !isCompleted && 'bg-primary-variant2/30'
                  )}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {step.icon}
                </button>

                <div className='mt-2 text-left -translate-y-2'>
                  <span
                    className={cn(
                      'text-sm font-medium',
                      isActive && 'text-foreground',
                      isCompleted && 'text-foreground',
                      !isActive && !isCompleted && 'text-muted-foreground'
                    )}
                  >
                    {step.label}
                  </span>
                  <p className=' text-xl font-semibold text-primary-darker'>
                    {step.text}
                  </p>
                </div>
              </div>

              {!isLast && (
                // <div
                //   className={cn(
                //     'w-full h-0.5 mx-2',
                //     isCompleted ? 'bg-red-500' : 'bg-muted-foreground/30'
                //   )}
                // />
                <img
                  src='/icons/dotted-line.svg'
                  alt='line'
                  className='w-full mx-15'
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Stepper;
