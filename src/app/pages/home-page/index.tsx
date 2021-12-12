import * as React from 'react';
import { Box, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { settingActions, useSettingSlice } from 'app/stores/setting-store';
import { useDispatch, useSelector } from 'react-redux';
import { selectBottomNav } from 'app/stores/setting-store/selectors';

export function HomePage() {
  const dispath = useDispatch();
  const isBottomNav = useSelector(selectBottomNav);

  return (
    <>
      <Helmet>
        <title>Truy xuất nguồn gốc thực phẩm</title>
        <meta name="description" content="Truy xuất nguồn gốc thực phẩm" />
      </Helmet>
      <Box>
        <span>HomePage Truy xuất nguồn gốc thực phẩm</span>
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
