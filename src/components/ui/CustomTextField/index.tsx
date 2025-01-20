import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField, { StandardTextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface CustomTextFieldProps extends StandardTextFieldProps {
  label?: string | React.ReactNode;
}
export default function CustomTextField(props: CustomTextFieldProps) {
  const { id, label, required, size = 'small', ...rest } = props;
  return (
    <Box mb={4} component='fieldset'>
      {label && (
        <InputLabel
          htmlFor={id}
          sx={{ mb: 2, color: 'grey.700', fontSize: 13, fontWeight: 'bold' }}
        >
          {label}
          {required && <span style={{ color: 'red' }}>*</span>}
        </InputLabel>
      )}
      <TextField variant='outlined' id={id} fullWidth size={size} {...rest} />
    </Box>
  );
}
