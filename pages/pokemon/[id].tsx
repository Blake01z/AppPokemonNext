import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router'
import { Layout } from '../../components/layouts'

interface Props {
    // pokemon: any;
    id: string;
    name: string;
}

const PokemonPage:NextPage<Props> = ({id,name}) => {

    const router = useRouter()
    console.log(router.query)

  return (
    <Layout title='Algun Pokemon'>
        <h1>{id} - {name}</h1>
    </Layout>
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const pokemon151 = [...Array(151)].map((value,index) => `${index + 1}`)

    return {
        paths: pokemon151.map(id => ({

        })),
        fallback: false
    }
}

export const getStaticProps:GetStaticProps = async (ctx) => {

    return{
        props:{
            id:1,
            name:'Bulbasaur'
        }
    }
}


export default PokemonPage