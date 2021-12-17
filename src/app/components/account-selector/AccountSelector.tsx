import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  useSubstrate,
  SubstrateAction,
} from 'libs/substrate/substrate.context';
import { formatAddress } from 'libs/utils/common';
import { IAccount } from 'libs/utils/model';
import React, { useState, useEffect, useMemo } from 'react';

export function AccountSelector(props) {
  const { keyring, dispatch, accountSelected, api } = useSubstrate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  // Get the list of accounts we possess the private key for
  const keyringOptions = useMemo<IAccount[]>(() => {
    if (!keyring || !api.query) return [];
    return keyring.getPairs().map(account => ({
      address: account.address,
      label: (account as any).meta.name.toUpperCase(),
    }));
  }, [keyring, api]);

  useEffect(() => {
    if (!!accountSelected || !dispatch) return;
    const initialAddress =
      keyringOptions.length > 0 ? keyringOptions[0].address : '';
    dispatch({ type: SubstrateAction.CHANGE_ACCOUNT, payload: initialAddress });
  }, [accountSelected, keyringOptions, dispatch]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event, addr) => {
    if (!!event) {
      setAnchorElUser(null);
      return;
    }
    if (addr === accountSelected) return;
    dispatch({ type: SubstrateAction.CHANGE_ACCOUNT, payload: addr });
    setAnchorElUser(null);
  };

  if (!accountSelected) return null;

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Change account">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Box
            border="2px solid #e2e1e1"
            borderRadius={2}
            padding="4px 10px"
            fontSize={13}
            color="#e2e1e1"
            marginRight={1}
          >
            <BalanceAnnotation accountSelected={accountSelected} />
          </Box>
          <Box
            border="2px solid #fff"
            borderRadius={8}
            padding="4px 10px"
            fontSize={14}
            color="#fff"
          >
            {formatAddress(accountSelected || '')}
            <span style={{ marginLeft: '2px' }}>▼</span>
          </Box>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {keyringOptions.map((account, idx) => (
          <MenuItem
            key={idx}
            onClick={() => handleCloseUserMenu(null, account.address)}
          >
            <Typography textAlign="center">{account.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

function BalanceAnnotation(props) {
  const { accountSelected } = props;
  const { api } = useSubstrate();
  const [accountBalance, setAccountBalance] = useState(0);

  // When account address changes, update subscriptions
  useEffect(() => {
    let unsubscribe;

    // If the user has selected an address, create a new subscription
    accountSelected &&
      api.query.system
        .account(accountSelected, balance => {
          setAccountBalance(balance.data.free.toHuman());
        })
        .then(unsub => {
          unsubscribe = unsub;
        })
        .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api, accountSelected]);

  return accountSelected ? <Box>${accountBalance}</Box> : null;
}

// export default function AccountSelector(props) {
//   const { api, keyring } = useSubstrate();
//   return keyring.getPairs && api.query ? <Main {...props} /> : null;
// }
