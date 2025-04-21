import { useState } from 'react';

const ZoraAirdropChecker = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!walletAddress) {
      setError("Wallet address is required");
      return;
    }

    setLoading(true);
    setError(null);
    setOutput(null);

    try {
      const response = await fetch("/api/web3/airdrop/checker/zora", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wallet: walletAddress }),
      });

      const data = await response.json();

      if (data.errors) {
        setError(data.errors[0]?.message || "Failed to fetch data from Zora.");
      } else {
        const result = data.data?.zoraTokenAllocation?.totalTokensEarned?.totalTokens;
        setOutput(result || "0");
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
    }
  };

  const handleDownload = () => {
    if (output) {
      const blob = new Blob([output], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'zora_airdrop_result.txt';
      link.click();
    }
  };

  return (
    <div className="container justify-end text-white text-left p-5 lg:w-1/2">
      <p className="font-bold">
        <span className="text-green-500">denzuqo@root:</span>
        <span className="text-amber-200">~</span>$ sudo ./Web3_Airdrop
      </p>
      <p className="font-bold">[sudo] password for user :</p>
      <p className="font-bold">
        <span className="text-green-500">denzuqo@root:</span>
        <span className="text-amber-200">~</span>$ sudo ./Checker_Zora
      </p>
      <br />

      <div>
        <div className="inline-block border-1 border-white border-b-white/0 py-1 px-2">
          <a href="/" className="font-bold text-sm">
            <span className="text-amber-200">&lt;</span>~ Back
          </a>
        </div>
        <div className="border-1 border-white p-3">
          <p className="font-bold">*Wallet Address</p>
          <input
            type="text"
            className="border-1 p-2 border-white w-full text-white bg-transparent"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
          <input
            type="button"
            value="Check"
            className="mt-5 p-2 bg-white text-black cursor-pointer"
            onClick={handleCheck}
            disabled={loading}
          />

          {loading && <p className="mt-4 text-white">Loading...</p>}

          {error && (
            <div className="mt-4 border-1 border-white text-red-500">
              <p className="p-3">{error}</p>
            </div>
          )}

          {output && (
            <div className="mt-4 border-1 border-white">
              <div className="p-3 flex justify-between items-center border-b border-white">
                <p className="font-bold">Result</p>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="text-sm bg-white text-black px-3 py-1 rounded hover:bg-gray-200"
                  >
                    Copy
                  </button>
                  <button
                    onClick={handleDownload}
                    className="text-sm bg-white text-black px-3 py-1 rounded hover:bg-gray-200"
                  >
                    Download .txt
                  </button>
                </div>
              </div>
              <div className="bg-gray-800">
                <p className="p-3 text-green-400 break-all whitespace-pre-wrap" id="output">
                  {output}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-28"></div>
      <p className="font-bold">
        <span className="text-green-500">denzuqo@root:</span>
        <span className="text-amber-200">~</span>$
        <span className="pl-1 blink-text">|</span>
      </p>
    </div>
  );
};

export default ZoraAirdropChecker;
