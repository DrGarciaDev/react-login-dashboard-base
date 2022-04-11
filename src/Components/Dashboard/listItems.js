import * as React from 'react';
import { Link } from 'react-router-dom';
// import AuthService from '../../Services/auth.service';

import { ListItem, ListItemIcon, ListItemText, ListSubheader, Tooltip } from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export const mainListItems = (
    <div>
        {/* {AuthService.hasRole(AuthService.getCurrentUser(), ['ROLE_C_EXTERIOR_ADMIN'])
            && */}
            <div>
                <Tooltip title="Dashboard" placement="right-start">
                    <Link to="/dashboard/index" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <ListItem button>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                    </Link>
                </Tooltip>
                
                <Tooltip title="Modulo 1" placement="right-start">
                    <Link to="/dashboard/modulo-1" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <ListItem button>
                            <ListItemIcon>
                                <AccountBalanceWalletIcon />
                            </ListItemIcon>
                            <ListItemText primary="Modulo 1" />
                        </ListItem>
                    </Link>
                </Tooltip>
            </div>
        {/* } */}
        
        <Tooltip title="Modulo 2" placement="right-start">
            <Link to="/dashboard/modulo-2" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <ListItem button>
                    <ListItemIcon>
                        <MonetizationOnIcon />
                    </ListItemIcon>
                    <ListItemText primary="Modulo 2" />
                </ListItem>
            </Link>
        </Tooltip>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItem>
    </div>
);
