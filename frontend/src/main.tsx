import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import '@/app/fonts/font.scss';
import './style.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />,
);