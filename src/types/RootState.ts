// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { SettingState } from 'app/stores/setting-store/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  settings: SettingState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
