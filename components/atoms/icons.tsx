import { AntDesign, Entypo, Feather, FontAwesome, FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

export type IconType =
    | 'Ionicons'
    | 'MaterialIcons'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'Feather'
    | 'AntDesign'
    | 'Entypo'
    | 'SimpleLineIcons'
    | 'Octicons'
    | 'MaterialCommunityIcons'
    | 'Fontisto'
    | 'Zocial';

export interface IconProps {
    type?: IconType;
    name: string;
    size?: number;
    color?: string;
    style?: StyleProp<TextStyle>;
}

export const Icon = ({
    type = 'Ionicons',
    name,
    size = 24,
    color = '#000',
    style
}: IconProps) => {
    const iconProps = { name, size, color, style } as any;

    switch (type) {
        case 'Ionicons':
            return <Ionicons {...iconProps} />;
        case 'MaterialIcons':
            return <MaterialIcons {...iconProps} />;
        case 'Feather':
            return <Feather {...iconProps} />;
        case 'FontAwesome':
            return <FontAwesome {...iconProps} />;
        case 'FontAwesome5':
            return <FontAwesome5 {...iconProps} />;
        case 'AntDesign':
            return <AntDesign {...iconProps} />;
        case 'Entypo':
            return <Entypo {...iconProps} />;
        case 'SimpleLineIcons':
            return <SimpleLineIcons {...iconProps} />;
        case 'Octicons':
            return <Octicons {...iconProps} />;
        case 'MaterialCommunityIcons':
            return <MaterialCommunityIcons {...iconProps} />;
        case 'Fontisto':
            return <Fontisto {...iconProps} />;
        case 'Zocial':
            return <Zocial {...iconProps} />;
        default:
            return <Ionicons {...iconProps} />;
    }
};