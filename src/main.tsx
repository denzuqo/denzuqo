import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AESTools from './pages/tools/AESTools.tsx'

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: "Lol"
  },
  {
    path: "/tools/aes",
    element: <AESTools />,
    errorElement: "Lol"
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
