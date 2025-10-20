import React from 'react';

export interface Application {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType<any>;
  initialWidth?: number;
  initialHeight?: number;
}

export const applications: Application[] = [
  {
    id: 'finder',
    name: 'Finder',
    icon: '📁',
    component: React.lazy(() => import('./FileExplorer').then(mod => ({ default: mod.FileExplorer }))),
    initialWidth: 800,
    initialHeight: 600
  },
  {
    id: 'notes',
    name: 'Notes',
    icon: '📝',
    component: React.lazy(() => import('./TextEditor').then(mod => ({ default: mod.TextEditor }))),
    initialWidth: 600,
    initialHeight: 400
  }
];

export const getApplication = (id: string): Application | undefined => {
  return applications.find(app => app.id === id);
};

export const getAllApplications = (): Application[] => {
  return applications;
};