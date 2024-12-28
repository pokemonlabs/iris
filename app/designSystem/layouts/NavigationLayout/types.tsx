import { ReactNode } from 'react';

export type NavigationItem = {
  key: string;
  label: string;
  position: string;
  onClick: () => void;
  requiresSubscription: boolean;
  isVisible?: boolean;
  icon?: ReactNode;
  id?: string;
  className?: string;
}
