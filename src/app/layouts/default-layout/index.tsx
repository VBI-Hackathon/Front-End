import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { BottomAppBar } from 'app/components/bottom-app-bar';
import { useSettingSlice } from 'app/stores/setting-store';
import { selectBottomNav } from 'app/stores/setting-store/selectors';
import { useSelector } from 'react-redux';
import { TopAppBar } from 'app/components/top-app-bar';

export function DefaultLayout() {
  const { actions } = useSettingSlice();
  const isBottomNav = useSelector(selectBottomNav);

  return (
    <Layout>
      <ContainerStyled maxWidth="sm">
        <TopAppBar />
        <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
          <Outlet />
        </Box>
        {isBottomNav && <BottomAppBar />}
      </ContainerStyled>
    </Layout>
  );
}

const ContainerStyled = styled(Container)({});

const Layout = styled(Box)({
  background: '#e3e6e8',
});
