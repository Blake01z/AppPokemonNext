import { FC } from "react"

import Head from "next/head"

import {Navbar} from '../ui'

interface Props{
  title?: String
}

const Layout: FC<Props> = ({children, title}) => {
  return (
    <>
        <Head>
            <title>{title || 'PokemonAPP'}</title>
            <meta name="author" content="Daniel Correa" />
            <meta name="description" content={`Informacíon sobre el pokemon : ${title}`}/>
            <meta name="keywords" content={`${title} pokemon, pokedex`}/>
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