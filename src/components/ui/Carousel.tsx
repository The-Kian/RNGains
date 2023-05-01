import { ReactNode, useState } from "react"
import { StyleSheetProperties } from "react-native";
import { ScrollView, StyleSheet, View} from "react-native"
import { Lift } from "../firestore/UserStatsTypes"
import { screenStyle } from "../../constants/styles";
import { interpolateColor } from "react-native-reanimated";


type ItemComponent = React.ComponentType<Lift>

interface CarouselProps {
    items: Lift[]
    itemsPerInterval: number
    ItemComponent: Element
}

export function Carousel ({items, itemsPerInterval, ItemComponent}: CarouselProps) {
    const [width, setWidth] = useState(0)
    const [intervals, setIntervals] = useState(0);
    itemsPerInterval = 1 

    const init  = (width: number) => {
        setWidth(width)
        const totalItems = items.length
        setIntervals(Math.ceil(totalItems)/itemsPerInterval)

    }


    return (
        <View style={screenStyle.rootContainer}>
            <ScrollView
            horizontal={true}
            contentContainerStyle={{ ...screenStyle.rootContainer, width: `${100 * intervals}%` }}
            showsHorizontalScrollIndicator={false}
            onContentSizeChange={(w, h) => init(w)}
            scrollEventThrottle={200}
            pagingEnabled
            decelerationRate="fast"
                  >

                    
            </ScrollView>


        </View>

    )
}

export default Carousel