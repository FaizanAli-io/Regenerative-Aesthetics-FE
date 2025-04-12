'use client';
import React, { ReactNode, useRef } from 'react';
import LoginForm from './LoginForm';
import HTMLFlipBook from 'react-pageflip';
import SignupForm from '../signup/SignUpForm';

const BookPage = React.forwardRef<
  HTMLDivElement,
  { children: ReactNode; number: string }
>((props, ref) => {
  return (
    <div className='grid place-content-center ' ref={ref}>
      {props.children}
    </div>
  );
});

const Page = () => {
  const pageFlip = useRef<any>(null);

  const turnNext = () => {
    if (pageFlip.current) {
      pageFlip.current.pageFlip().flipNext();
    }
  };

  const turnPrev = () => {
    if (pageFlip.current) {
      pageFlip.current.pageFlip().flipPrev();
    }
  };

  return (
    <div className='flex justify-center items-center overflow-hidden'>
      {/* @ts-ignore */}
      <HTMLFlipBook
        className='-translate-y-65 overflow-hidden'
        width={900}
        height={800}
        ref={pageFlip}
        autoSize
        useMouseEvents={false}
      >
        <BookPage number='1'>
          <LoginForm navigateToSignup={turnNext} />
        </BookPage>
        <BookPage number='2'>
          <SignupForm navigateToLogin={turnPrev} />
        </BookPage>
      </HTMLFlipBook>
    </div>
  );
};

export default Page;
