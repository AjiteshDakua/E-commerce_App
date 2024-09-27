import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t '>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 md-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className=' flex flex-col justify-center items-start gap-6 '>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>700-425 mg roar <br /> Kolkata, West Bangal </p>
          <p className='text-gray-500'>Tel: 123-456-7890<br /> Email: contact@forever.com </p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
          <p className='text-gray-500'>Lern more about our teams and openings.</p>
          <button className='border border-black px-8 py4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default Contact
