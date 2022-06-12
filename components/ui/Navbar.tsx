import {Spacer, Text,useTheme, Link} from '@nextui-org/react'
import Image from 'next/image'
import NextLink from 'next/link'

const Navbar = () => {

    const {theme} = useTheme()

  return (
    <div style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0px 50px',
        backgroundColor: theme?.colors.gray800.value
    }}>
        <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
            alt='Iconos pokemon'
            width={70}
            height={70}
        />

        <NextLink href="/" passHref>
            <Link>
                <Text color='white' h2>P</Text>
                <Text color='white' h3>okemón</Text>
            </Link>
        </NextLink>
        
        <Spacer css={{flex: 1}}/>


        <NextLink href="/favorites" passHref>
            <Link>
                <Text color='white'>Favoritos</Text>
            </Link>
        </NextLink>
    </div>
  )
}

export { 
    Navbar 
}