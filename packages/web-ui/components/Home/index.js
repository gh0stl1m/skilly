import Head from 'next/head'

// Components
import { Footer } from '../commons';

import { MainContainer, MainTitle, HomeContainer } from './styles';

export default function Home() {
  return (
    <HomeContainer> 
      <Head>
        <title>Skilly App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainContainer>
        <MainTitle> 
          Welcome to <span>Skilly App</span> 
        </MainTitle>
      </MainContainer>

      <Footer />
    </HomeContainer>
  )
}
