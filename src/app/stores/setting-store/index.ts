import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { SettingState } from './types';

export const initialState: SettingState = {
  bottomNav: false,
};

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // displayButtonNav(state, action?: PayloadAction<any>) {
    //   state.bottomNav = true;
    // },
    displayButtonNav(state) {
      state.bottomNav = true;
    },
    hiddenButtomNav(state, action?: PayloadAction<any>) {
      state.bottomNav = false;
    },
  },
});

export const { actions: settingActions, reducer } = slice;

export const useSettingSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  // useInjectSaga({ key: slice.name, saga: sagafnc });
  return { actions: slice.actions };
};
