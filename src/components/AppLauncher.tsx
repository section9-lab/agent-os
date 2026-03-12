import React from 'react';
import booksIcon from '../assets/icons/books.png';
import finderIcon from '../assets/icons/finder.png';
import mapIcon from '../assets/icons/map.png';
import messagesIcon from '../assets/icons/messages.png';
import musicIcon from '../assets/icons/music.svg';
import notesIcon from '../assets/icons/notes.png';
import safariIcon from '../assets/icons/safari.png';
import settingIcon from '../assets/icons/settings1.webp';

export interface Application {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType;
  initialWidth?: number;
  initialHeight?: number;
}

export const applications: Application[] = [
  {
    id: 'finder',
    name: 'Finder',
    icon: finderIcon,
    component: React.lazy(() => import('./FileExplorer').then(mod => ({ default: mod.FileExplorer }))),
    initialWidth: 800,
    initialHeight: 600,
  },
  {
    id: 'safari',
    name: 'Safari',
    icon: safariIcon,
    component: React.lazy(() => import('./Safari').then(mod => ({ default: mod.Safari }))),
    initialWidth: 1024,
    initialHeight: 768,
  },
  {
    id: 'messages',
    name: 'Messages',
    icon: messagesIcon,
    component: React.lazy(() => import('./MessagesApp').then(mod => ({ default: mod.MessagesApp }))),
    initialWidth: 900,
    initialHeight: 620,
  },
  {
    id: 'notes',
    name: 'Notes',
    icon: notesIcon,
    component: React.lazy(() => import('./TextEditor').then(mod => ({ default: mod.TextEditor }))),
    initialWidth: 700,
    initialHeight: 500,
  },
  {
    id: 'maps',
    name: 'Maps',
    icon: mapIcon,
    component: React.lazy(() => import('./MapsApp').then(mod => ({ default: mod.MapsApp }))),
    initialWidth: 980,
    initialHeight: 640,
  },
  {
    id: 'books',
    name: 'Books',
    icon: booksIcon,
    component: React.lazy(() => import('./BooksApp').then(mod => ({ default: mod.BooksApp }))),
    initialWidth: 900,
    initialHeight: 620,
  },
  {
    id: 'music',
    name: 'Music',
    icon: musicIcon,
    component: React.lazy(() => import('./MusicApp').then(mod => ({ default: mod.MusicApp }))),
    initialWidth: 980,
    initialHeight: 640,
  },
  {
    id: 'setting',
    name: 'Settings',
    icon: settingIcon,
    component: React.lazy(() => import('./SettingsApp').then(mod => ({ default: mod.SettingsApp }))),
    initialWidth: 920,
    initialHeight: 620,
  },
];

export const getApplication = (id: string): Application | undefined => {
  return applications.find(app => app.id === id);
};

export const getAllApplications = (): Application[] => {
  return applications;
};
