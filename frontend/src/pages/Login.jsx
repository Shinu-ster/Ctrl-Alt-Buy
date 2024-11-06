import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Login() {
    return (
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <TextField label="Email" variant="standard" />
          <TextField label="Password" variant="standard" type="password"/>
          <Button variant="contained">Submit</Button>
        </Box>
      );
}
