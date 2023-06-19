import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import InvestView from '../src/views/invests'
import styles from '../styles/Home.module.css'
import MarketView from '@/views/markets'

const Home: NextPage = () => {
  return (
    <MarketView />
  
  )
}

export default Home
