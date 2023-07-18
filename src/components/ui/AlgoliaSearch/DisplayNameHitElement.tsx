import { Text } from 'react-native'
import { userDetailHit } from '../../../constants/algoliaHit/algoliaHitTypes'

interface HitProps {
    hit: userDetailHit;
  }
  


export function DisplayNameHitElement({ hit }: HitProps) {
	return (
		<Text>
			{hit.displayName}
		</Text>
	)
}