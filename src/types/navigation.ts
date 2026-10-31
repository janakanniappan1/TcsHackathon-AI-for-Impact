import { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: 'teal' | 'red' | 'amber' | 'blue';
}

