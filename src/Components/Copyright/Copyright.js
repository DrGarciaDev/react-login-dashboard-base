import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center" component={'span'}>
            {'Copyright © '}
            <Link color="inherit" href="https://google.com.mx/" target="-blank">
                DrGarciaDev
            </Link>
            {' - '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}