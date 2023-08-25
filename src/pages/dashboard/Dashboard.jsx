import React from "react";
import { useSelector } from "react-redux";
import { appSelector } from "../../redux/appRedux";
import { Link } from "react-router-dom";
import { Grid, Paper, Box, Button, Card, CardContent, Typography } from '@mui/material';

const Dashboard = () => {
const todo = useSelector(appSelector.todo);

const completedTasks = todo.filter(task => task.completed);
const pendingTasks = todo.filter(task => !task.completed);

return (
    <Grid container spacing={3}>
    <Grid item xs={6}>
        <Paper sx={{ p: 3 }}>
        <Box>
            <Link to='/fetch'>
            <Button variant="outlined" color="success" fullWidth={true}>Fetchlist</Button>
            </Link>
        </Box>
        </Paper>
    </Grid>
    <Grid item xs={6}>
        <Paper sx={{ p: 3 }}>
        <Box>
            <Link to='/todo'>
            <Button variant="outlined" color="success" fullWidth={true}>Todo</Button>
            </Link>
        </Box>
        </Paper>
    </Grid>
    <Grid item xs={12}>
        <Card>
        <CardContent>
            <Typography variant="h6">Resumen de Tareas</Typography>
            <Typography variant="subtitle1">
            Tareas Completadas: {completedTasks.length} de {todo.length}
            </Typography>
            <Typography variant="subtitle1">
            Tareas Pendientes: {pendingTasks.length} de {todo.length}
            </Typography>
        </CardContent>
        </Card>
    </Grid>
    </Grid>
);
};

export default Dashboard;