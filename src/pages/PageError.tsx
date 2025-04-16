import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

function PageError() {
  const error = useRouteError();

  let status = 'Unknown';
  let message = 'Terjadi kesalahan.';

  if (isRouteErrorResponse(error)) {
    status = error.status.toString();
    message = error.statusText;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <>
      <div className='container justify-end text-white text-left p-5 lg:w-1/2'>
        <p className='font-bold'>
          <span className='text-green-500'>user@root:</span>
          <span className='text-amber-200'>~</span>$ sudo ./Page_Error
        </p>
        <p className='font-bold'>[sudo] password for user :</p>
        <br />
        <p className='font-bold text-2xl'>
            <span className='text-red-500'>{status}</span>&nbsp;|&nbsp; 
            <span className='text-gray-300'>{message}</span>
        </p>

        <br />
        <Link to='/' className='font-bold text-sm'>
              <span className='text-amber-200'>&lt;</span>~ Back
        </Link>

        <div className='pt-28'></div>
        <p className='font-bold'>
          <span className='text-green-500'>user@root:</span>
          <span className='text-amber-200'>~</span>$
          <span className='pl-1 blink-text'>|</span>
        </p>
      </div>
    </>
  );
}

export default PageError;
