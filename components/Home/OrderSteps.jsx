import { FaFileSignature, FaIndustry, FaPhone, FaTruck } from "react-icons/fa";

const OrderSteps = () => {
  return (
    <section className='bg-[#e7d9d4] pt-30 pb-10'>
      <div className='container mx-auto max-w-[1300px] px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-black molde-expanded mb-4'>
            <span className='font-serif text-5xl text-black'>4</span> steps to
            order an OMSPACE house
          </h2>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12'>
          <div className='text-center flex flex-col items-center'>
            <FaPhone className='text-6xl text-gray-800 mb-4' />
            <h3 className='text-lg font-semibold text-gray-700 mb-2'>
              Submit a request
            </h3>
            <p className='text-sm text-gray-500'>
              Preliminary budget estimate for the house configuration you are
              interested in.
            </p>
          </div>
          <div className='text-center flex flex-col items-center'>
            <FaFileSignature className='text-6xl text-gray-800 mb-4' />
            <h3 className='text-lg font-semibold text-gray-700 mb-2'>
              Contract processing
            </h3>
            <p className='text-sm text-gray-500'>
              Contract signing and advance payment.
            </p>
          </div>
          <div className='text-center flex flex-col items-center'>
            <FaIndustry className='text-6xl text-gray-800 mb-4' />
            <h3 className='text-lg font-semibold text-gray-700 mb-2'>
              Production of your house
            </h3>
            <p className='text-sm text-gray-500'>
              Depending on availability and level of customization (from 40 to
              90 days).
            </p>
          </div>
          <div className='text-center flex flex-col items-center'>
            <FaTruck className='text-6xl text-gray-800 mb-4' />
            <h3 className='text-lg font-semibold text-gray-700 mb-2'>
              Delivery
            </h3>
            <p className='text-sm text-gray-500'>
              We inform you that your house is ready and coordinate the delivery
              method and installation (optional).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSteps;
