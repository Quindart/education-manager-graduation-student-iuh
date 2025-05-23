import { Box, Button, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import TitleManager from '@/components/ui/Title';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useMajor } from '@/hooks/api/useQueryMajor';
import { Icon } from '@iconify/react';
import AddModal from '../Modal/AddModal';

function Header() {
  const { termStore } = useTerm();
  //Modal
  const [openAddEvent, setOpenAddEvent] = useState(false);
  const handleOpenAddEventModal = () => {
    setOpenAddEvent(true);
  };
  const handleCloseAddEventModal = () => {
    setOpenAddEvent(false);
  };
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
        <TitleManager variant='h5' fontWeight={'bold'} color={'grey.700'}>
          Quản lý sự kiện của {termStore.currentTerm.name}
        </TitleManager>
        <Tooltip title={'Thêm'}>
          <Button
            size='small'
            color='error'
            type='button'
            onClick={handleOpenAddEventModal}
            variant='contained'
          >
            <Icon icon='lets-icons:add-round' width={20} />
          </Button>
        </Tooltip>
      </Box>
      <AddModal open={openAddEvent} onClose={handleCloseAddEventModal} />
    </>
  );
}

export default Header;
