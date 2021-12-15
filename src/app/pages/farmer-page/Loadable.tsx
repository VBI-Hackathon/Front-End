import { lazyLoad } from 'utils/loadable';

export const FarmerPage = lazyLoad(
  () => import('./index'),
  module => module.FarmerPage,
);
