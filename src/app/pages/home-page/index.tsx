import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { settingActions, useSettingSlice } from 'app/stores/setting-store';
import { useDispatch, useSelector } from 'react-redux';
import { selectBottomNav } from 'app/stores/setting-store/selectors';
import { useSubstrate } from 'libs/substrate/substrate.context';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';

export function HomePage() {
  const dispath = useDispatch();
  const isBottomNav = useSelector(selectBottomNav);
  const { api, keyring, connect } = useSubstrate();
  console.log(keyring?.getPairs());
  // const [accountSelected, setAccountSelected] = useState('');

  // // Get the list of accounts we possess the private key for
  // const keyringOptions = keyring.getPairs().map(account => ({
  //   key: account.address,
  //   value: account.address,
  //   text: (account as any)?.meta?.name?.toUpperCase(),
  //   icon: 'user',
  // }));
  // console.log('keyringOptions', keyringOptions);

  // const initialAddress =
  //   keyringOptions.length > 0 ? keyringOptions[0].value : '';

  // console.log(
  //   'initialAddress',
  //   ,
  // );
  // console.log({ keyringOptions });
  useEffect(() => {
    const test = async () => {
      // await web3Enable(process.env.REACT_APP_APP_NAME as string, xx => {
      //   console.log('xx', xx);
      // });
      web3Accounts().then(res => console.log({ res }));
    };
    test();
  }, []);

  // const getFromAcct = async () => {
  //   const injected = await web3FromSource(source);
  //   fromAcct = address;
  //   api.setSigner(injected.signer);

  //   return fromAcct;
  // };

  return (
    <>
      <Helmet>
        <title>Truy xuất nguồn gốc thực phẩm</title>
        <meta name="description" content="Truy xuất nguồn gốc thực phẩm" />
      </Helmet>
      <Box>
        {/* <Button
          variant="outlined"
          onClick={async () => {
            api.query.timestamp.now().then(res => {
              console.log('xx', res.toNumber());
            });
            api.query['traceAbility']
              .logInfosOwned(
                '0x57c85425412a4639aa0216ccb3d39922b6cb38dd5c6da4e3aabec13d5becaead',
              )
              .then(res => {
                console.log('logInfosOwned', res.toJSON());
              });
            const palletRpc = 'templateModule';
            const callable = 'doSomething';
            const transformed = [11111];
            // api.tx[palletRpc][callable](transformed).signAndSend();
          }}
        >
          Test
        </Button> */}
        <span>Truy xuất nguồn gốc thực phẩm</span>
        {!isBottomNav && (
          <Box mt="20px" display="flex" justifyContent="center">
            <Button
              variant="outlined"
              onClick={() => {
                dispath(settingActions.displayButtonNav());
              }}
            >
              Connect Wallet
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}
