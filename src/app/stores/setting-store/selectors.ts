import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectDomain = (state: RootState) => state.settings || initialState;

export const selectBottomNav = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.bottomNav,
);
