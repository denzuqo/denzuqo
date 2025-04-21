import { useState } from "react";
import { Link } from "react-router-dom";

function ZoraAirdropChecker() {
  const [wallet, setWallet] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!wallet) return;
    setLoading(true);
    setOutput("");

    const query = `
      query {
        zoraTokenAllocation(
          identifierWalletAddresses: ["${wallet}"],
          zoraClaimContractEnv: PRODUCTION
        ) {
          totalTokensEarned {
            totalTokens
          }
        }
      }
    `;

    try {
      const res = await fetch("https://api.zora.co/universal/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
      });

      const json = await res.json();
      const tokens =
        json?.data?.zoraTokenAllocation?.totalTokensEarned?.totalTokens || "0";
      setOutput(`Wallet : ${wallet}\nTotal Tokens Earned : ${tokens}`);
    } catch (err) {
      console.error(err);
      setOutput("❌ Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([output], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "zora_result.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <>
      <div className='container justify-end text-white text-left p-5 lg:w-1/2'>
        <p className='font-bold'>
          <span className='text-green-500'>denzuqo@root:</span>
          <span className='text-amber-200'>~</span>$ sudo ./Web3_Airdrop
        </p>
        <p className='font-bold'>[sudo] password for user :</p>
        <br />
        <p className='font-bold'>
          <span className='text-green-500'>denzuqo@root:</span>
          <span className='text-amber-200'>~</span>$ sudo ./Checker_Zora
        </p>
        <br />

        <div>
          <div className='inline-block border-1 border-white border-b-white/0 py-1 px-2'>
            <Link to='/' className='font-bold text-sm'>
              <span className='text-amber-200'>&lt;</span>~ Back
            </Link>
          </div>
          <div className='border-1 border-white p-3'>
            <p className='font-bold'>*Wallet Address</p>
            <input
              type='text'
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              className='border-1 p-2 border-white w-full text-white bg-transparent'
            />

            <input
              type='button'
              value={loading ? "Checking..." : "Check"}
              onClick={handleCheck}
              disabled={loading}
              className='mt-5 p-2 bg-white text-black cursor-pointer disabled:opacity-50'
            />

            {output && (
              <div className='mt-4 border-1 border-white'>
                <div className='p-3 flex justify-between items-center border-b border-white'>
                  <p className='font-bold'>Result</p>
                  <div className='flex gap-2'>
                    <button
                      onClick={handleCopy}
                      className='text-sm bg-white text-black px-3 py-1 rounded hover:bg-gray-200'>
                      Copy
                    </button>
                    <button
                      onClick={handleDownload}
                      className='text-sm bg-white text-black px-3 py-1 rounded hover:bg-gray-200'>
                      Download .txt
                    </button>
                  </div>
                </div>
                <div className='bg-gray-800'>
                  <p
                    className='p-3 text-green-400 break-all whitespace-pre-wrap'
                    id='output'>
                    {output}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

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

export default ZoraAirdropChecker;
