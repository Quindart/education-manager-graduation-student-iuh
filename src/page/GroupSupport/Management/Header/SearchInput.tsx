import React, { useState, useMemo, useEffect } from 'react';
import {
  TextField,
  Box,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  BoxProps,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useParams from '@/hooks/ui/useParams';

const SEARCH_FIELD = {
  topicName: 'tên đề tài',
  key: 'Mã nhóm',
};

function SearchInput({ sx }: BoxProps) {
  const [sort, setSort] = useState('ASC');
  const [typeSearch, setTypeSearch] = useState('name');

  useEffect(() => {
    setTypeSort(sort);
    onTypeSearchChange(typeSearch);
  }, [sort, typeSearch]);

  const { onSearchChange, getQueryField, onTypeSearchChange, setTypeSort } = useParams();

  return (
    <Box sx={{ ...sx, display: 'flex', gap: 3, width: '100%' }}>
      <FormControl sx={{ width: 150, padding: 0 }}>
        <Select
          size='small'
          id='search-type'
          value={typeSearch}
          defaultValue='name'
          onChange={(e) => setTypeSearch(e.target.value)}
        >
          <MenuItem value='name'>Mã nhóm</MenuItem>
          <MenuItem value='topicName'>Tên đề tài</MenuItem>
        </Select>
      </FormControl>

      <TextField
        variant='outlined'
        fullWidth
        defaultValue={getQueryField('keywords')}
        size='small'
        placeholder='Tìm kiếm đề tài theo...'
        onChange={onSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon sx={{ color: 'primary.dark' }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default SearchInput;
