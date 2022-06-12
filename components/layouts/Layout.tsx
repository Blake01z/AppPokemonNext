import { FC } from "react"

import Head from "next/head"

import {Navbar} from '../ui'
import { useRouter } from 'next/router';

interface Props{
  title?: String
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

const Layout: FC<Props> = ({children, title}) => {

  return (
    <>
        <Head>
            <title>{title || 'PokemonAPP'}</title>
            <meta name="author" content="Daniel Correa" />
            <meta name="description" content={`Informacíon sobre el pokemon : ${title}`}/>
            <meta name="keywords" content={`${title} pokemon, pokedex`}/>

            <meta property="og:title" content={`Informacion Sobre el ${title}`} />
            <meta property="og:description" content={`Esta es la pagina sobre ${title}`} />
            <meta property="og:image" content={`${origin}/img/banner.png`} />
        </Head>
        
        <Navbar/>
        
        <main style={{
          padding:'0px 20px'
        }}>
            {children}
        </main>
    </>
  )
}

export {
  Layout
}