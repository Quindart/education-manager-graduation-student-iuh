import styled from '@emotion/styled';
import { Box, InputLabel, Typography } from '@mui/material';
import { DateTimePicker, DateTimePickerProps, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ErrorMessage } from 'formik';
import React from 'react';

interface CalendarPropsType extends DateTimePickerProps<any> {
  className?: string;
  id?: string;
  label?: string;
  error?: boolean;
  name?: string;
  required?: boolean;
}
const ErrorStyled = styled(ErrorMessage)`
  color: #ca4f36;
  font-size: 10px;
  margin-top: 6px;
  margin-left: 16px;
`;

function DateTimeCalendar(props: CalendarPropsType) {
  const { className, label, id, name, error, required, sx, ...rest } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display={'flex'} className={`${className}`} sx={sx} flexDirection='column'>
        {label && (
          <InputLabel
            htmlFor={id}
            sx={{ mb: 3, color: 'grey.700', fontWeight: '600', fontSize: 13 }}
          >
            {label}{' '}
            {required && (
              <Typography component={'span'} sx={{ color: 'error.main' }}>
                *
              </Typography>
            )}
          </InputLabel>
        )}
        <DateTimePicker
          {...rest}
          sx={{
            color: 'grey.700',
            fieldset: {
              border: error ? '1px solid #ca4f36!important' : '',
            },
            '.MuiInputBase-root input': {
              padding: 5,
            },
            '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' },
          }}
        />
        {error && <ErrorStyled id={`${name}`} name={`${name}`} component={'div'} />}
      </Box>
    </LocalizationProvider>
  );
}

export default DateTimeCalendar;
