import { View } from "react-native";
import { useContext, useState } from "react";

import { AuthContext } from "../../components/auth/AuthProvider";
import { CredentialsType } from "../../components/auth/AuthTypes";
import AuthContent from "../../components/auth/AuthContent";
import { ScreenStyle } from "../../constants/styles";
import LoadingOverlay from "../LoadingOverlay";

export default function ProfileScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);
	const { update } = useContext(AuthContext);

	async function updateProfileHandler(
		displayName: string,
	) {
		setIsAuthenticating(true);
		await update({ displayName});
		setIsAuthenticating(false);
	}

	if (isAuthenticating) {
		return <LoadingOverlay message="Updating details" />;
	}

	return (
		<View style={ScreenStyle.rootContainer}>
			<AuthContent
				authScreenType="update"
				onSubmit={(credentials: CredentialsType) => {
					updateProfileHandler(credentials.displayName);
				}}
				credentialsInvalid={{
					email: false,
					confirmEmail: false,
					password: false,
					confirmPassword: false,
				}}
			></AuthContent>
		</View>
	);
}
