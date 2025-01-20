import useParams from '@/hooks/ui/useParams';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  BoxProps,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';

function SearchInput({ sx }: BoxProps) {
  const [sort, setSort] = useState('ASC');
  const [typeSearch, setTypeSearch] = useState('key');

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
          defaultValue='key'
          onChange={(e) => setTypeSearch(e.target.value)}
        >
          <MenuItem value='key'>Mã đề tài</MenuItem>
          <MenuItem value='name'>Tên đề tài</MenuItem>
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
