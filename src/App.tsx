function App() {

  return (
    <>
      <div className='container justify-end text-white text-left p-5 lg:w-1/2'>

          <p className='font-bold'><span className='text-green-500'>denzuqo@root:</span><span className='text-amber-200'>~</span>$ sudo ./about</p>
          <p className='font-bold'>[sudo] password for denzuqo :</p>

          <div className='flex flex-col lg:flex-row pt-5'>
            <div className='flex-shrink-0'>
              <img src='https://pbs.twimg.com/profile_images/1908620422373138434/am80mWNg_400x400.jpg' className='rounded-xl w-[100px]'/>
            </div>

            <div className='lg:pl-3'>
              <p className='text-xl font-bold pt-3 lg:pt-0 pb-3 lg:pb-0'>Denzuqo</p>
              <p className='text-sm text-justify lg:text-left'>Here, you can get to know more about me. I’m from Indonesia, specifically from West Java, and I was born during the economic crisis in the era of President Suharto.</p>
              <p className='text-sm text-justify lg:text-left pt-4'>I have a deep passion for technology. My hobbies revolve around learning and coding — whether it's Object-Oriented Programming, Functional Programming, or working with native methods. Recently, I've been exploring the fast-growing fields of Web3 and Artificial Intelligence (AI).</p>
              <p className='text-sm text-justify lg:text-left pt-4'>For me, technology is more than just an interest — it's a way to understand the world and shape the future. Thank you for visiting, and I hope you find something valuable or inspiring here!</p>
            </div>
          </div>

          <div className='pt-5'></div>
          <p className='font-bold'><span className='text-green-500'>denzuqo@root:</span><span className='text-amber-200'>~</span>$ sudo ./skill</p>

          <div className='flex flex-col lg:flex-row pt-2'>
          <pre className='text-sm leading-6 font-mono text-white'>
{`├─ Technology
  ├─ Cross-Platform Development
  ├─ Programming Languages
  ├─ Data Management Systems
  ├─ DevOps
  └─ Cybersecurity
`}
            </pre>
          </div>

          <div className='pt-5'></div>
          <p className='font-bold'><span className='text-green-500'>denzuqo@root:</span><span className='text-amber-200'>~</span>$ sudo ./social_media</p>

          <div className='pt-2'>
            <a href='https://x.com/denzuqo' target='_blink'>X (Twitter)</a><span className='pl-3 pr-3'>|</span><a href='https://warpcast.com/denzuqo' target='_blink'>Warpcast</a> 
          </div>

          <div className='pt-5'></div>
          <p className='font-bold'><span className='text-green-500'>denzuqo@root:</span><span className='text-amber-200'>~</span>$ sudo ./web3</p>

          <div className='flex flex-col lg:flex-row pt-2'>
          <pre className='text-sm leading-6 font-mono text-white'>
{`├─ Testnet participation
  ├─ Plume
  ├─ Supra
  ├─ Privasea
  ├─ Hana
  ├─ Hemi
  ├─ LayerEdge
  └─ Malda
`}
            </pre>
          </div>

          <div className='pt-5'></div>
          <p className='font-bold'><span className='text-green-500'>denzuqo@root:</span><span className='text-amber-200'>~</span>$<span className='pl-1 blink-text'>|</span></p>
      </div>
    </>
  )
}

export default App
