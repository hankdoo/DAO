import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import InvestView from '../src/views/invests'
import styles from '../styles/Home.module.css'
import CollectionView from '@/views/market'
import HomeView from '@/views/home'

const Home: NextPage = () => {
  return (
    <HomeView />
  )
}

export default Home
