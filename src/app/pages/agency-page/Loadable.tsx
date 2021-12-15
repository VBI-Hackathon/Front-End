import { lazyLoad } from 'utils/loadable';

export const AgencyPage = lazyLoad(
  () => import('./index'),
  module => module.AgencyPage,
);
