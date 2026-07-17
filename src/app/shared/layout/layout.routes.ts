import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Projects } from '../../features/projects/projects';
import { Epics } from '../../features/epics/epics';

export const layout_ROUTES: Routes = [
  {
    path: '',
    component: Layout,
    children: [
        {path:'projects', component: Projects},
        {path:'epics', component: Epics},
    ],
  },
];