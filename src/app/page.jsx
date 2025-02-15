import SubmitButton from "./components/SubmitButton"

export default function Home(){
  return (
    <main>
      <section className='section'>
        <div className='container'>
          <h1 className='title text-3x1 font-bold flex flex-col items-center text-lg'>Upload Files</h1>
          <SubmitButton />
        </div>
      </section>
    </main>
  )
}