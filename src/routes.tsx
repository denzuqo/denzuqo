import App from './App';
import AESTools from './pages/tools/AESTools';
import Error from './pages/PageError';
import ShortLInk from './pages/ShortLink';
import ZoraAirdropChecker from './pages/web3/airdrop/checker/ZoraAirdropChecker';
import Maintenance from './pages/Maintenance';


const rawRoutes = [
  { path: '/', element: <Maintenance /> },
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
