import { useState } from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import CryptoJS from 'crypto-js';

// Helper for UTF-8 safe Base64
function utf8ToBase64(str: string): string {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function base64ToUtf8(str: string): string {
  return decodeURIComponent(escape(window.atob(str)));
}

function AESTools() {
  const [mode, setMode] = useState('Encrypt');
  const [plainText, setPlainText] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value);
    setOutput('');
  };

  const handleSubmit = () => {
    if (!plainText || !privateKey) {
      setOutput('⚠️ Plain Text and Private Key are required!');
      return;
    }

    try {
      if (mode === 'Encrypt') {
        const base64Text = utf8ToBase64(plainText);
        const encrypted = CryptoJS.AES.encrypt(base64Text, privateKey).toString();
        setOutput(encrypted);
      } else {
        const bytes = CryptoJS.AES.decrypt(plainText, privateKey);
        const decryptedBase64 = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedBase64) throw new Error('Invalid decryption.');

        const originalText = base64ToUtf8(decryptedBase64);
        setOutput(originalText);
      }
    } catch (error) {
      setOutput('❌ Failed to process. Check your input and key.');
    }
  };

  const handleCopy = () => {
    const textToCopy = document.getElementById('output')?.innerText;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <>
      <div className='container justify-end text-white text-left p-5 lg:w-1/2'>
        <p className='font-bold'>
          <span className='text-green-500'>user@root:</span>
          <span className='text-amber-200'>~</span>$ sudo ./Tool_AES
        </p>
        <p className='font-bold'>[sudo] password for user :</p>

        <br />
        <div>
          <div className='inline-block border-1 border-white border-b-white/0 py-1 px-2'>
            <Link to='/' className='font-bold text-sm'>
              <span className='text-amber-200'>&lt;</span>~ Back
            </Link>
          </div>
          <div className='border-1 border-white p-3'>
            <div className='flex gap-2'>
              <div className='flex items-center ps-4 border border-gray-200'>
                <input
                  id='enc-radio'
                  type='radio'
                  name='mode'
                  className='w-4 h-4 text-white bg-gray-100 border-gray-300 focus:ring-blue-500'
                  value='Encrypt'
                  checked={mode === 'Encrypt'}
                  onChange={handleRadioChange}
                />
                <label htmlFor='enc-radio' className='w-full p-3 text-sm font-bold text-white'>
                  *Encryption
                </label>
              </div>

              <div className='flex items-center ps-4 border border-gray-200'>
                <input
                  id='dec-radio'
                  type='radio'
                  name='mode'
                  className='w-4 h-4 text-white bg-gray-100 border-gray-300'
                  value='Decrypt'
                  checked={mode === 'Decrypt'}
                  onChange={handleRadioChange}
                />
                <label htmlFor='dec-radio' className='w-full p-3 text-sm font-bold text-white'>
                  *Decryption
                </label>
              </div>
            </div>

            <p className='pt-5 font-bold'>*Plain Text</p>
            <textarea
              className='border-1 border-white w-full h-32 text-white p-2 bg-transparent'
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
            ></textarea>

            <p className='pt-5 font-bold'>*Private Key</p>
            <input
              type='text'
              className='border-1 p-2 border-white w-full text-white bg-transparent'
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
            />

            <input
              type='button'
              value={mode}
              className='mt-5 p-2 bg-white text-black cursor-pointer'
              onClick={handleSubmit}
            />

            {output && (
              <div className='mt-4 border-1 border-white'>
                <div className='p-3 flex justify-between items-center border-b border-white'>
                  <p className='font-bold'>Result</p>
                  <button
                    onClick={handleCopy}
                    className='text-sm bg-white text-black px-3 py-1 rounded hover:bg-gray-200'
                  >
                    Copy
                  </button>
                </div>
                <div className='bg-gray-800'>
                  <p className='p-3 text-green-400 break-all whitespace-pre-wrap' id='output'>{output}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='pt-5'></div>
        <p className='font-bold'>
          <span className='text-green-500'>user@root:</span>
          <span className='text-amber-200'>~</span>$
          <span className='pl-1 blink-text'>|</span>
        </p>
      </div>

      {copied && (
        <div className='fixed top-10 right-5 bg-gray-800 text-white px-4 py-2 border-1 border-white shadow-lg animate-bounce'>
          Copied to clipboard!
        </div>
      )}
    </>
  );
}

export default AESTools;
