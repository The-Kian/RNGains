
import { AuthProvider } from '../auth/AuthProvider';
import Routes from './Routes';
export default function Providers() {
  return (
    <AuthProvider >
      <Routes />
    </AuthProvider>
  );
}