import React from 'react';
import Image from 'next/image';

const NaturallyCrafted = () => {
  return (
    <section className='px-20 py-24 grid grid-cols-2 bg-dark place-content-center'>
      <Image
        src='/images/home/nature.png'
        width={1000}
        height={1000}
        alt='Natural Products.'
        className='w-full h-full object-cover'
      />
      <div className='h-full flex flex-col justify-center items-end'>
        <h2 className='font-bold text-6xl mb-10 text-white'>
          All Crafted Naturally
        </h2>
        <p className='text-body text-right text-lg mb-5'>
          Lorem ipsum dolor sit amet consectetur. Rutrum vel quis molestie sit
          eu lacus amet. Morbi rutrum vitae ultrices tincidunt pharetra enim.
          Enim vestibulum ultricies semper augue. Risus dictum mauris cras amet
          at vitae semper tellus. Tellus nec odio libero tellus egestas tempus.
          Nibh nascetur diam risus sem cursus imperdiet vitae placerat. Integer
          vestibulum nunc sem diam eu. Volutpat quam in tempus sapien eu cursus
          sed amet donec.
        </p>
        <p className='text-body text-right text-lg'>
          Neque ac erat curabitur commodo. Viverra in etiam amet odio
          ullamcorper. Nullam risus purus duis sodales volutpat pharetra.
          Imperdiet dolor amet eget aliquam blandit egestas. Facilisis posuere
          ut id nibh elit velit amet sed rutrum. Nibh fusce lacinia justo
          scelerisque risus ultrices. In pretium sed rutrum vitae ullamcorper
          nisl. Sed gravida suspendisse facilisis donec in. Nisi amet fermentum
          sed lectus. Malesuada viverra volutpat volutpat erat convallis magna
          tincidunt leo non. Ornare in nunc neque lacinia. Aliquam ultrices
          purus nec erat. Elementum mattis odio feugiat proin mauris dolor
          volutpat lorem. Quis id vitae integer velit suspendisse porta sit
          velit urna.
        </p>
      </div>
    </section>
  );
};

export default NaturallyCrafted;
