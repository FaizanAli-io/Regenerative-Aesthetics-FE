import { Button } from '@/components/ui/button';
import React from 'react';
import BlogCard from '../_components/BlogCard';

const BlogContent = () => {
  return (
    <section className='px-20 my-28'>
      <header>
        <h1 className='text-7xl font-bold text-primary-darker'>
          Essential Skincare Tips for Radiant Skin
        </h1>
        <div className='flex space-x-10 my-10'>
          <Button>#Healthy Skin</Button>
          <Button>#Skin</Button>
          <Button>#HRadiant Skin</Button>
        </div>
        <div className='my-10'>
          <BlogCard />
        </div>
      </header>
      <main className='space-y-5'>
        <p>Lorem ipsum, everyone 👏</p>
        <p>
          Lacinia ut gravida tempus sollicitudin condimentum sit urna cursus
          malesuada. Eu lacus dis et tempor non. Odio tristique dignissim lorem
          ipsum vestibulum. Cras quisque praesent.
        </p>
        <ol className='list-decimal list-inside'>
          <li>
            Cleanse daily Remove dirt, oil, and impurities with a gentle
            cleanser.
          </li>
          <li>
            Hydrate & moisturize Keep your skin plump and nourished with a good
            moisturizer.
          </li>
          <li>
            Use sunscreen Protect your skin from harmful UV rays every day.
          </li>
          <li>
            Exfoliate regularly Get rid of dead skin cells for a fresh, glowing
            look
          </li>
        </ol>
        <div>
          <h2 className='font-medium text-3xl text-primary-darker mb-4'>
            1. What is a Skincare Routine?
          </h2>
          <p>
            A skincare routine is a set of daily habits designed to keep your
            skin healthy, hydrated, and protected. Whether you have dry, oily,
            or combination skin, the right routine can help prevent breakouts,
            early signs of aging, and dullness.
          </p>
        </div>

        <div>
          <h2 className='font-medium text-3xl text-primary-darker mb-4'>
            2. When Should You Follow a Skincare Routine?
          </h2>
          <p>
            Consistency is key! Your skincare routine should be followed every
            morning and night to keep your skin balanced and protected. In the
            morning, focus on hydration and sun protection, while the nighttime
            routine should prioritize repair and nourishment.
          </p>
        </div>

        <div>
          <h2 className='font-medium text-3xl text-primary-darker mb-4'>
            3. How to Build the Perfect Skincare Routine
          </h2>
          <ol className='list-decimal list-inside'>
            <li>
              Start with a gentle cleanser – Wash your face with a cleanser
              suitable for your skin type.
            </li>
            <li>
              Apply a toner – This helps balance your skin’s pH and preps it for
              the next steps.
            </li>
            <li>
              Use a serum – Choose a serum based on your skin’s needs
              (hydration, brightening, or anti-aging).
            </li>
            <li>
              Moisturize well – Lock in hydration with a good moisturizer.
            </li>
            <li>
              Always wear sunscreen – Protect your skin from sun damage during
              the day. By following these simple steps, you can achieve glowing,
              healthy skin effortlessly!
            </li>
          </ol>
        </div>
      </main>
    </section>
  );
};

export default BlogContent;
