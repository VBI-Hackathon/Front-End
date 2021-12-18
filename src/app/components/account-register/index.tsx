import React from 'react';
import { useSubstrate } from 'libs/substrate/substrate.context';
import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export function AccountRegisterBtn() {
  const { accountInfo } = useSubstrate();

  if (!!accountInfo) return null;

  return (
    <Box p="10px">
      <Link to="/register" style={{ color: 'red', fontWeight: 'bold' }}>
        Đăng kí tài khoản để cập nhập địa điểm lô hàng
      </Link>
    </Box>
  );
}
