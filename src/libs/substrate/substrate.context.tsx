import React, { useReducer, useContext } from 'react';
import jsonrpc from '@polkadot/types/interfaces/jsonrpc';
import { connectSubstrate, loadAccounts } from './substrate.utils';
import { ApiPromise } from '@polkadot/api';

import {
  SubstrateAction,
  SubstrateActions,
  SubstrateState,
} from './substrate.type';
export { SubstrateAction } from './substrate.type';

const INIT_STATE = {
  socket: process.env.REACT_APP_SUBSTRATE_PROVIDER_SOCKET,
  jsonrpc: { ...jsonrpc },
  keyring: null,
  keyringState: null,
  api: null as unknown as ApiPromise,
  apiError: null,
  apiState: null,
  accountSelected: '',
} as unknown as SubstrateState;

const SubstrateContext = React.createContext<SubstrateState>(INIT_STATE);

const reducer = (state: SubstrateState, action: SubstrateActions) => {
  switch (action.type) {
    case SubstrateAction.CONNECT_INIT:
      return { ...state, apiState: 'CONNECT_INIT' };

    case SubstrateAction.CONNECT:
      return { ...state, api: action.payload, apiState: 'CONNECTING' };

    case SubstrateAction.CONNECT_SUCCESS:
      return { ...state, apiState: 'READY' };

    case SubstrateAction.CONNECT_ERROR:
      return { ...state, apiState: 'ERROR', apiError: action.payload };

    case SubstrateAction.LOAD_KEYRING:
      return { ...state, keyringState: 'LOADING' };

    case SubstrateAction.SET_KEYRING:
      return { ...state, keyring: action.payload, keyringState: 'READY' };

    case SubstrateAction.KEYRING_ERROR:
      return { ...state, keyring: null, keyringState: 'ERROR' };

    case SubstrateAction.CHANGE_ACCOUNT:
      return { ...state, accountSelected: action.payload };

    default:
      throw new Error(`Unknown type: ${action.type}`);
  }
};

export const SubstrateContextProvider = props => {
  // filtering props and merge with default param value
  const initState = { ...INIT_STATE };
  const neededPropNames = ['socket'];
  neededPropNames.forEach(key => {
    initState[key] =
      typeof props[key] === 'undefined' ? initState[key] : props[key];
  });

  const [state, dispatch] = useReducer(reducer, initState);
  connectSubstrate(state, dispatch);
  loadAccounts(state, dispatch);
  Object.assign(state, { dispatch });

  return (
    <SubstrateContext.Provider value={state}>
      {props.children}
    </SubstrateContext.Provider>
  );
};

export const useSubstrate = () => ({ ...useContext(SubstrateContext) });
