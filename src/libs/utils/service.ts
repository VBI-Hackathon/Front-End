import type { KeyringPair } from '@polkadot/keyring/types';
import { ApiPromise } from '@polkadot/api';

const palletRpc = 'traceAbility';
export const SubtrateService = (api: ApiPromise, account?: KeyringPair) => {
  return {
    getUserInfo: (address: string) =>
      api.query[palletRpc]['userInfos'](address),
    logInfosOwned: (hashId: string) =>
      api.query[palletRpc]['logInfosOwned'](hashId),
    registerUser: (username, address) =>
      api.tx[palletRpc]['registerUser'](username, address).signAndSend(account!),
    createAbility: (name: string, quantity: number, note: string) =>
      api.tx[palletRpc]['createAbility'](name, quantity, note).signAndSend(
        account!,
      ),
    updateAbility: (hashId: string) =>
      api.tx[palletRpc]['createAbility'](hashId).signAndSend(account!),
  };
};
