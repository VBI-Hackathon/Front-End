import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';

export function BottomAppBar() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

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
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Action label="Recents" icon={<RestoreIcon htmlColor="white" />} />
          <Action label="Favorites" icon={<FavoriteIcon htmlColor="white" />} />
          <Action label="Archive" icon={<ArchiveIcon htmlColor="white" />} />
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
