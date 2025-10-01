
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './router.jsx';

const root = document.getElementById('root')


import { AuthProvider } from './hooks/AuthContext';

ReactDOM.createRoot(root).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)

