
import { AuthProvider } from '../auth/AuthProvider'
import Routes from '../../components/navigation/Routes'
export default function Providers() {
	return (
		<AuthProvider >
			<Routes />
		</AuthProvider>
	)
}