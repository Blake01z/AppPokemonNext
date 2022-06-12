import { useState } from 'react';
import Image from 'next/image';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { Grid, Card, Text, Button, Container } from '@nextui-org/react';

import { Layout } from '../../components/layouts'
import pokeApi from '../../config/pokeApi';
import { Pokemon } from '../../interfaces';
import {localFavorites} from '../../utils';
import confetti from 'canvas-confetti';
import { PokemonListResponse } from '../../interfaces/pokemon-list';

interface Props {
    pokemon: Pokemon;
}

const PokemonByNamePage:NextPage<Props> = ({pokemon}) => {

    const [isInfavorites, setIsInfavorites] = useState(localFavorites.existInFavorites(pokemon.id))

    const onToggleFavorite = () => {
        localFavorites.toggleFavorites(pokemon.id)
        setIsInfavorites(!isInfavorites)

        if(!isInfavorites) return;

        confetti({
            zIndex:999,
            particleCount: 100,
            spread:160,
            angle: -100,
            origin: {
                x: 1,
                y: 0,
            }
        })

    }
    


  return (
    <Layout title={pokemon.name}>
        <Grid.Container css={{marginTop: '5px'}} gap={2}>
            <Grid xs={12} sm={4}>
                <Card hoverable css={{padding: '30px'}}>
                    <Card.Body>
                        <Card.Image src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                            alt={pokemon.name}
                            width="100%"
                            height={200}
                        />
                    </Card.Body>
                </Card>
            </Grid>
            
            <Grid xs={12} sm={8}>
                <Card>
                    <Card.Header css={{display: 'flex', justifyContent: 'space-between'}}>
                        <Text h1 transform='capitalize'>{pokemon.name}</Text>
                        <Button
                        color='gradient'
                        ghost={!isInfavorites}
                        onClick={onToggleFavorite}
                        >
                            {
                                isInfavorites ? 'Quitar de Favoritos' : 'Agregar en Favoritos'
                            }
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Text size={30}>Sprites:</Text>

                        <Container direction='row' display='flex' justify='space-evenly'>
                            <Image src={pokemon.sprites.front_default} 
                                alt={pokemon.name}
                                width={150}
                                height={150}
                            />
                            <Image src={pokemon.sprites.back_default} 
                                alt={pokemon.name}
                                width={150}
                                height={150}
                            />
                            <Image src={pokemon.sprites.front_shiny} 
                                alt={pokemon.name}
                                width={150}
                                height={150}
                            />
                            <Image src={pokemon.sprites.back_shiny} 
                                alt={pokemon.name}
                                width={150}
                                height={150}
                            />
                        </Container>

                    </Card.Body>
                </Card>
            </Grid>

        </Grid.Container>
    </Layout>
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const {data} = await pokeApi.get<PokemonListResponse>(`/pokemon/?limit=151`)
    const pokemonNames:string[] = data.results.map(pokemon => pokemon.name)

    return {
        paths: pokemonNames.map(name => ({
            params: {name}
        })),
        fallback: false
    }
}

export const getStaticProps:GetStaticProps = async ({params}) => {

    const {name} = params as {name: string}

    const {data} = await pokeApi.get<Pokemon>(`/pokemon/${name}`)

    return{
        props:{
            pokemon: data
        }
    }
}


export default PokemonByNamePage