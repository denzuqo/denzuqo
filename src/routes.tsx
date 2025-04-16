import App from './App'
import AESTools from './pages/tools/AESTools'
import Error from './pages/PageError'


const rawRoutes = [
  { path: '/', element: <App /> },
  { path: '/tools/aes', element: <AESTools /> },
]

// Tambahkan errorElement ke semua route secara otomatis
const routes = rawRoutes.map(route => ({
  ...route,
  errorElement: <Error />
}))

export default routes
