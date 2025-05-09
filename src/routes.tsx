import App from './App';
import AESTools from './pages/tools/AESTools';
import Error from './pages/PageError';
import ShortLInk from './pages/ShortLink';
import ZoraAirdropChecker from './pages/web3/airdrop/checker/ZoraAirdropChecker';


const rawRoutes = [
  { path: '/', element: <App /> },
  { path: '/.wel-known/atproto-did', element: 'did:plc:52q5abysaaku2u73euojjjgb' },
  { path: '/tools/aes', element: <AESTools /> },
  { path: '/sl/:code', element: <ShortLInk /> },
  { path: '/web3/airdrop/checker/zora', element: <ZoraAirdropChecker /> },
];

// Tambahkan errorElement ke semua route secara otomatis
const routes = rawRoutes.map(route => ({
  ...route,
  errorElement: <Error />
}));

export default routes;
