import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3ListRpcProviders,
  web3UseRpcProvider,
} from '@polkadot/extension-dapp';
import { ApiPromise, WsProvider } from '@polkadot/api';
import keyring from '@polkadot/ui-keyring';

import {
  SubstrateAction,
  SubstrateActions,
  SubstrateState,
} from './substrate.type';
import { Dispatch } from 'react';

const developmentKeyring = process.env.REACT_APP_DEVELOPMENT_KEYRING === 'true';

export const connectSubstrate = async (
  state: SubstrateState,
  dispatch: Dispatch<SubstrateActions>,
) => {
  if (state.apiState) return;
  const provider = new WsProvider(state.socket);
  const _api = new ApiPromise({ provider, rpc: state.jsonrpc });

  // Set listeners for disconnection and reconnection event.
  _api.on('connected', () => {
    console.log(_api);
    dispatch({ type: SubstrateAction.CONNECT, payload: _api });
    // `ready` event is not emitted upon reconnection and is checked explicitly here.
    _api.isReady.then(_api =>
      dispatch({ type: SubstrateAction.CONNECT_SUCCESS }),
    );
  });
  _api.on('ready', () => dispatch({ type: SubstrateAction.CONNECT_SUCCESS }));
  _api.on('error', err =>
    dispatch({ type: SubstrateAction.CONNECT_ERROR, payload: err }),
  );
};

let loadAccts = false;
export const loadAccounts = (
  state: SubstrateState,
  dispatch: Dispatch<SubstrateActions>,
) => {
  const asyncLoadAccounts = async () => {
    dispatch({ type: SubstrateAction.LOAD_KEYRING });
    try {
      await web3Enable(process.env.REACT_APP_APP_NAME as string);
      let allAccounts = await web3Accounts();
      allAccounts = allAccounts.map(({ address, meta }) => ({
        address,
        meta: { ...meta, name: `${meta.name} (${meta.source})` },
      }));
      keyring.loadAll({ isDevelopment: developmentKeyring }, allAccounts);
      dispatch({ type: SubstrateAction.SET_KEYRING, payload: keyring });
    } catch (e) {
      console.error(e);
      dispatch({ type: SubstrateAction.KEYRING_ERROR });
    }
  };

  const { keyringState } = state;
  // If `keyringState` is not null `asyncLoadAccounts` is running.
  if (keyringState) return;
  // If `loadAccts` is true, the `asyncLoadAccounts` has been run once.
  if (loadAccts)
    return dispatch({ type: SubstrateAction.SET_KEYRING, payload: keyring });

  // This is the heavy duty work
  loadAccts = true;
  asyncLoadAccounts();
};
