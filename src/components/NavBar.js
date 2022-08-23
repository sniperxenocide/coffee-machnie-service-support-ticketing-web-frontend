import React,{ Component } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DvrIcon from '@mui/icons-material/Dvr';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from 'react-router-dom';

class NavBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value:0,
            paths:[
                '/dashboard',
                '/tickets',
                '/login'
            ]
        }

        let path = window.location.pathname;
        let v = this.state.paths.indexOf(path);
        if(v > -1){this.state.value=v}

    }

    render() {
        return(
        <Box>
            <BottomNavigation
                className="bg-dark" showLabels value={this.state.value}
                onChange={(event, newValue) => {
                    this.setState({value:newValue})
                }}
                sx={{
                    "& .Mui-selected,.Mui-selected > svg": {
                        color: "#f5c962"
                    },
                    "& .MuiBottomNavigationAction-root":{
                        color:'#e9ecf5'
                    }
                }}
            >
                <BottomNavigationAction  value={0} label="Dashboard" icon={<AnalyticsIcon/>}
                                         component={Link} to={this.state.paths[0]} />
                <BottomNavigationAction  value={1} label="Tickets" icon={<DvrIcon />}
                                         component={Link} to={this.state.paths[1]}/>
                <BottomNavigationAction  value={2} label="Logout" icon={<LogoutIcon />}
                                         component={Link} to={this.state.paths[2]}/>
            </BottomNavigation>
        </Box>
        )
    }
}

export default NavBar