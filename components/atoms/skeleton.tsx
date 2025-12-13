import { cn } from '@/lib/utils';
import { View } from 'react-native';

/**
 * Skeleton component
 * @param {SkeletonProps} props - The props for the skeleton component.
 * @returns {React.ReactNode} The skeleton component.
 */
function Skeleton({
  className,
  ...props
}: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return <View className={cn('bg-gray-300 animate-pulse rounded-md', className)} {...props} />;
}

export { Skeleton };
