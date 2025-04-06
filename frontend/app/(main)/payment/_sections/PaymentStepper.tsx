'use client';

import Stepper from '@/app/components/Stepper';
import { CreditCardIcon, MapPin, ShoppingCart } from 'lucide-react';
import React from 'react';

const steps = [
  {
    id: 'step-1',
    label: 'Step 1',
    text: 'Address',
    icon: <MapPin className='w-4 h-4 text-white' />,
  },
  {
    id: 'step-2',
    label: 'Step 2',
    text: 'Shipping',
    icon: <ShoppingCart className='w-4 h-4 text-white' />,
  },
  {
    id: 'step-3',
    label: 'Step 3',
    text: 'Payment',
    icon: <CreditCardIcon className='w-4 h-4 text-white' />,
  },
];

const PaymentStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepClick = (step: number) => {
    setActiveStep(step);
  };

  return (
    <section className='px-20 my-28'>
      <Stepper
        steps={steps}
        activeStep={activeStep}
        onStepClick={handleStepClick}
      />
    </section>
  );
};

export default PaymentStepper;
