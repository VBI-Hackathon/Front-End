import { ApiPromise } from '@polkadot/api';
import keyring from '@polkadot/ui-keyring';

export interface SubstrateState {
  socket: string;
  jsonrpc: {
    RPC: {};
  };
  keyring: typeof keyring;
  keyringState: string;
  api: ApiPromise;
  apiError: any;
  apiState: string;
}

export enum SubstrateAction {
  CONNECT_INIT = 'CONNECT_INIT',
  CONNECT = 'CONNECT',
  CONNECT_SUCCESS = 'CONNECT_SUCCESS',
  CONNECT_ERROR = 'CONNECT_ERROR',
  LOAD_KEYRING = 'LOAD_KEYRING',
  SET_KEYRING = 'SET_KEYRING',
  KEYRING_ERROR = 'KEYRING_ERROR',
}

export interface SubstrateActions {
  type: SubstrateAction;
  payload?: any;
}
