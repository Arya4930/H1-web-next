"use client";


import SubmitButton from "./components/SubmitButton";

export default function Home() {
  return (
    <main className='bg-background min-h-screen flex flex-col items-center'>
    <div className='navbar w-full bg-foreground p-4 text-textPrimary text-center text-2xl'>
      <i className='fa fa-space-shuttle'></i> Deforestify
    </div>
    <section className='flex-grow flex justify-center items-center'>
      <div className='card bg-foreground p-8 rounded-xl shadow-lg shadow-black/50 text-center w-96'>
        <h2 className='text-textPrimary text-2xl mb-4'>Select Date Range</h2>
        <label htmlFor='start-date' className='text-textSecondary block text-left'>Start Date</label>
        <select className='dropdown w-full p-2 mt-1 mb-4 rounded bg-background text-textPrimary' id='start-date'>
          <option>January 1, 2023</option>
        </select>
        <label htmlFor='end-date' className='text-textSecondary block text-left'>End Date</label>
        <select className='dropdown w-full p-2 mt-1 mb-4 rounded bg-background text-textPrimary' id='end-date'>
          <option>February 1, 2023</option>
        </select>
        <SubmitButton className='w-full bg-accent text-background py-2 px-4 rounded hover:bg-button-hover transition duration-300' text='Submit' />
      </div>
    </section>
    <div className='footer bg-foreground w-full text-textPrimary text-center p-4'>
      <a href='#' className='mx-2'>Privacy Policy</a> | 
      <a href='#' className='mx-2'>Terms of Service</a> | 
      <a href='#' className='mx-2'>Contact Us</a>
    </div>
  </main>
  
  );
}
