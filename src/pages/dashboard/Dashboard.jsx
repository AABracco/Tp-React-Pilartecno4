import React, {useEffect} from "react";
import {
    Grid,
    Paper,
    Box,
    Button
} from '@mui/material';
import {Link} from "react-router-dom";


const Dashboard = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Paper sx={{p: 3}}>
                    <Box>
                        <Link to='/fetch'>
                            <Button variant="outlined" color="success" fullWidth='true'>Fetchlist</Button>
                        </Link>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper sx={{p: 3}}>
                    <Box>
                        <Link to='/todo'>
                            <Button variant="outlined" color="success" fullWidth='true'>Todo</Button>
                        </Link>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};
export default Dashboard;