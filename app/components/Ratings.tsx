import { StarIcon } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useState } from 'react';

const Star = motion(StarIcon);

interface Props {
  onChange: (n: number) => void;
  value: number;
}

const Ratings = ({ onChange, value: val }: Props) => {
  // const [value, setValue] = useState<number>(val);
  const stars = new Array(5).fill(null);

  const handleClick = (n: number) => {
    onChange(n);
    // setValue(n);
  };

  return (
    <div className='flex space-x-1'>
      {stars.map((_, i) => (
        <Star
          key={i}
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className='cursor-pointer'
          fill={i + 1 <= val ? 'gold' : 'white'}
          strokeWidth={1}
          onClick={() => handleClick(i + 1)}
        />
      ))}
    </div>
  );
};

export default Ratings;
