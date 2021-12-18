import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

enum Tab {
  CREATE_ORDER,
}
export function BottomAppBar() {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          right: 0,
          transform: 'translateX(-50%)',
          maxWidth: 'calc(600px - 42px)',
          width: '100%',
          color: 'white',
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          sx={{ background: 'var(--main-color)' }}
          value={value}
          onChange={(event, tab) => {
            setValue(tab);
            if (tab === Tab.CREATE_ORDER) {
              navigate('/farmer');
            }
          }}
        >
          <Action
            label="Tạo lô hàng"
            icon={<PostAddIcon htmlColor="white" />}
            value={Tab.CREATE_ORDER}
          />
          {/* <Action label="Archive" icon={<ArchiveIcon htmlColor="white" />} /> */}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

const Action = styled(BottomNavigationAction)({
  // background: '#e3e6e8',
  opacity: '0.7',
  '& .MuiButtonBase-root': {},
  '& .MuiBottomNavigationAction-label': {
    color: 'white',
    // opacity: '0.7',
  },
  '&.Mui-selected': {
    // color: '#0e0e0e',
    // fontWeight: 'bold',
    opacity: '1',
  },
});
