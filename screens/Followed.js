import { Text, SafeAreaView } from "react-native"
import FollowedNavigation from "../components/navigators/FollowedNavigation"

export default function Science() {
    return (
        <SafeAreaView>
            <FollowedNavigation />
            <Text>Followed here</Text>
        </SafeAreaView>
    )
}