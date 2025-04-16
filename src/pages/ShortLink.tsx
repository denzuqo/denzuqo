import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ShortLInk() {
  const { code } = useParams();
  const [status, setStatus] = useState('Loading ...');
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://raw.githubusercontent.com/denzuqo/shortlinkdb/refs/heads/main/${code}.json`);
        if (!response.ok) throw new Error('Data not found!');
        const result = await response.json();
        if (result.url) {
          setStatus(`Redirecting to ${result.url}`);
          setRedirecting(true);
          setTimeout(() => {
            window.location.href = result.url;
          }, 1500);
        } else {
          setStatus('Data found, but no URL inside!');
        }
      } catch (err) {
        if (err instanceof Error) {
          setStatus(`${err.message}`);
        } else {
          setStatus('An unknown error occurred!');
        }
      }
    };

    if (code) {
      fetchData();
    }
  }, [code]);

  return (
    <>
      <div className='container justify-end text-white text-left p-5 lg:w-1/2'>
        <p className='font-bold'>
          <span className='text-green-500'>denzuqo@root:</span>
          <span className='text-amber-200'>~</span>$ sudo ./Short_Link
        </p>
        <p className='font-bold'>[sudo] password for user :</p>
        <br />

        <p>{status}</p>
        {!redirecting ||<p className='pt-1 font-bold'>Please wait ...</p>}

        <div className='pt-28'></div>
        <p className='font-bold'>
          <span className='text-green-500'>denzuqo@root:</span>
          <span className='text-amber-200'>~</span>$
          <span className='pl-1 blink-text'>|</span>
        </p>
      </div>
    </>
  );
}

export default ShortLInk;
