import React, {useEffect, useState} from "react";
import {
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    CardMedia
} from '@mui/material';
import api from '../../services/api';
import { appActions } from "../../redux/appRedux";
import { useDispatch } from "react-redux";
import { IMG_URL } from "../../constants/url.js";
import POKE_IMG from "../../assets/images/POKE.png";

const Fetchlist = () => {
    const dispatch = useDispatch();
    const [pokemons, setPokemons] = useState(null);
    const [next, setNext] = useState('');

    useEffect(()=>{
        getPokemons()
    },[])

    const getPokemons = async () => {
        try {
            dispatch(appActions.loading(true))
            const result = await api.GET(api.pokemons)
            if(result){
                console.log('poke: ', result)
                setPokemons(result.results)
                setNext(result.next)
            }
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(appActions.loading(false))
        }
    }

    const renderItem = (item) => {
        const path = item.url.split('/')
        const imgID = getPokemonImgId(path[6])
        const imageUrl = `${IMG_URL}/${imgID}.png`;

        return(
            <Card p={2} sx={{ display: 'flex', height:100, cursor:'pointer',
                '&:hover': {backgroundColor: '#5acdbd', color:'white'}}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        N° {imgID}
                    </Typography>
                    <Typography component="div" variant="h5">
                        {item.name}
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    src={imageUrl}
                    alt="Live from space album cover"
                />
            </Card>
        )
    }

    const getPokemonImgId = (id) => {
        console.log('long. '+id.length)
        switch (id.length) {
            case 1:
                return `00${id}`
            case 2:
                return `0${id}`
            default:
                return id
        }
    }

    const loadMore = async () => {
        try {
            dispatch(appActions.loading(true))
            const result = await api.GET(next)
            if(result){
                console.log('poke: ', result.results)
                setPokemons(prev=>[...prev, ...result.results])
                setNext(result.next)
            }
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(appActions.loading(false))
        }
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper sx={{p: 3}}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography component="div" variant="h5">
                            Mi Pokedex
                        </Typography>
                    </Grid>
                    {
                        pokemons && pokemons.map((p, index)=>{
                            return(
                                <Grid item xs={4} key={index}>
                                    {renderItem(p)}
                                </Grid>
                            )
                        })
                    }
                        <Grid item xs={4} >
                            <Card p={2} sx={{ display: 'flex', height:100, cursor:'pointer',
                                backgroundColor:'#317b52', '&:hover': {backgroundColor: '#5acdbd'}}}
                                onClick={()=>loadMore()}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5" sx={{color:'white'}}>
                                        Cargar Más
                                    </Typography>
                                </CardContent>
                                <CardMedia
                                component="img"
                                sx={{ width: 100, p:2 }}
                                image={POKE_IMG}
                                alt="Live from space album cover"/>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};
export default Fetchlist;