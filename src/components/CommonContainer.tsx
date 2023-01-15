import React from "react";
import { View } from "native-base";

interface Props {
    children: React.ReactNode
}

const CommonContainer: React.FC<Props> = ({children}) => (
    <View flex="1" bg="white" justifyContent="center" alignItems="center" w="full">{children}</View>
)

export default CommonContainer