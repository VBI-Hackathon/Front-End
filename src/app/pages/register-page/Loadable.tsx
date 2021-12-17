import { lazyLoad } from 'utils/loadable';

export const RegisterPage = lazyLoad(
  () => import('./index'),
  module => module.RegisterPage,
);
