import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pro-filer/edit-resume/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'pro-filer/view-resume/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'pro-filer/add-experience/:resumeId',
    renderMode: RenderMode.Client
  },
  {
    path: 'pro-filer/edit-experience/:resumeId/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'pro-filer/add-education/:resumeId',
    renderMode: RenderMode.Client
  },
  {
    path: 'pro-filer/edit-education/:resumeId/:id',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
