import DropDown from '@/components/ui/Dropdown';
import { Icon } from '@iconify/react';
import { Box, Button, TextField, Tooltip } from '@mui/material';
import AddModal from '../Modal/AddModal';
import React, { useState } from 'react';

function HeaderTerm() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };
  const handleOpenModal = () => {
    setOpenAddModal(true);
  };

  return (
    <>
      <Box mb={4} display={'flex'} justifyContent={'end'} flexWrap={'wrap'} gap={4}>
        <Tooltip onClick={handleOpenModal} title='Tạo học kỳ'>
          <Button
            size='small'
            color='error'
            type='button'
            variant='contained'
            startIcon={<Icon icon='mdi:plus' color='#fff' width={20} />}
          >
            Tạo học kỳ
          </Button>
        </Tooltip>
      </Box>
      <AddModal open={openAddModal} onClose={handleCloseAddModal} />
    </>
  );
}

export default React.memo(HeaderTerm);
