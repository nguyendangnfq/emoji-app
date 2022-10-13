import React, { useMemo } from 'react';
import { Text, TextProps } from 'react-native';
import { theme } from './../theme';

type AppTextType = TextProps & {
  fontFamily: 'bold' | 'regular' | 'italic';
};

export const AppText: React.FC<AppTextType> = ({
  children,
  fontFamily,
  style,
  ...props
}) => {
  const fontStyle = useMemo(() => {
    if (fontFamily === 'bold') {
      return { fontFamily: theme.fontFamilyBold };
    }
  }, [fontFamily]);

  return (
    <Text {...props} style={[style, fontStyle]}>
      {children}
    </Text>
  );
};
