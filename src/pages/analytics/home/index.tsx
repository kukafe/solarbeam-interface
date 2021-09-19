/* eslint-disable @next/next/link-passhref */

import LayoutWrapperAnalytics from '../../../components/LayoutWrapperAnalytics'
import React, { useEffect, useState } from 'react'
import { Box } from 'rebass'
import styled from 'styled-components'
import { AutoRow, RowBetween } from '../../../components/Row'
import { Panel } from '../../../components/Panel'
import GlobalChart from '../../../components/GlobalChart'
import Head from 'next/head'
import Link from 'next/link'
import SolarbeamLogo from '../../../components/SolarbeamLogo'
import { PageWrapper, ContentWrapper } from '../../../components/analyticsCSS'
import { ThemedBackground, TYPE } from '../../../components/Theme'
import { transparentize } from 'polished'
import { AutoColumn } from '../../../components/Column'
import { useMedia } from 'react-use'
import TxnList from '../../../components/TxnList'
import Checkbox2 from '../../../components/Checkbox2'
import QuestionHelper from '../../../components/QuestionHelper'
import PairList from '../../../components/PairList'
import { CustomLink } from '../../../components/Link'
import { formattedNum, formattedPercent } from '../../../utils'
import TopTokenList from '../../../components/TokenList'
import DoubleGlowShadow from '../../../components/DoubleGlowShadow'
import Card from '../../../components/Card'
import AnalyticsItem from '../../../components/AnalyticsItem'
// import { t } from '@lingui/macro'
// import { useLingui } from '@lingui/react'

const ListOptions = styled(AutoRow)`
  height: 400px;
  width: 100%;
  font-size: 1.25rem;
  font-weight: 600;

  @media screen and (max-width: 640px) {
    font-size: 1rem;
  }
`

const GridRow = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  //column-gap: 6px;
  align-items: start;
  justify-content: space-between;
`

export default function AnalyticsHome(): JSX.Element{
  const {
    allPairs,
    allTokens,
    transactions,
    totalLiquidityUSD,
    oneDayVolumeUSD,
    volumeChangeUSD,
    liquidityChangeUSD
  } = require('../../../mockData')

  const below800 = useMedia('(max-width: 800px)')

  // const { i18n } = useLingui()
  // scrolling refs
  useEffect(() => {
    document.querySelector('body').scrollTo({
      behavior: 'smooth',
      top: 0
    })
  }, [])

  // for tracked data on pairs
  const [useTracked, setUseTracked] = useState(true)

  const [savedOpen, setSavedOpen] = useState(false)
  // @ts-ignore
  return (
    <>
      <Head>
        <title>Analytics | Solarbeam</title>
        <meta key='description' name='description' content='Analytics' />
      </Head>

      <div className='container px-0 mx-auto pb-6'>
        <div className={`mb-2 pb-4 grid grid-cols-12 gap-4`}>
          <div className='flex justify-center items-center col-span-12 lg:justify'>
            <Link href='/farm'>
              <SolarbeamLogo />
            </Link>
          </div>
        </div>

        <DoubleGlowShadow maxWidth={false} opacity={'0.4'}>
          <div className={`grid grid-cols-12 gap-2 min-h-1/2`}>
            <div className={`col-span-12`}>
              <Card className='bg-dark-900 z-4'>
                <LayoutWrapperAnalytics savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                  {/*@ts-ignore*/}
                  <AnalyticsItem>
                    <GridRow>
                      <Panel className="space-y-2" style={{ height: '100%'}}>
                        <div className='hover:text-high-emphesis text-base font-bold text-primary'>
                          Liquidity
                        </div>
                        {/*       @ts-ignore */}
                        <GlobalChart display='liquidity' />
                      </Panel>
                      <Panel className="space-y-2" style={{ height: '100%'}}>
                        <div className='hover:text-high-emphesis text-base font-bold text-primary'>
                          Volume
                        </div>
                        {/*       @ts-ignore */}
                        <GlobalChart display='volume' />
                      </Panel>
                    </GridRow>
                  </AnalyticsItem>
                  {/*@ts-ignore*/}
                  <AnalyticsItem title={`Top Tokens`}>
                    {/*<Panel style={{ marginTop: '6px', padding: '1.125rem 0 ' }}>  */}
                    <TopTokenList tokens={[]} />
                    {/*</Panel>*/}
                  </AnalyticsItem>

                  <AnalyticsItem
                    title={`Top Pairs`}
                    //@ts-ignore
                    subTitle={
                      <>
                        <Checkbox2
                          setChecked={() => setUseTracked(!useTracked)}
                          checked={useTracked}
                          text={'Hide untracked pairs'}
                        />
                        <QuestionHelper
                          text='USD amounts may be inaccurate in low liquiidty pairs or pairs without ETH or stablecoins.' />
                      </>
                    }
                  >


                    {/*<CustomLink to={'/analytics/pairs'}>See All</CustomLink>*/}

                    {/*<Panel style={{ marginTop: '6px', padding: '1.125rem 0 ' }}>*/}
                      {/*@ts-ignore*/}
                      <PairList pairs={allPairs} useTracked={useTracked} />
                    {/*</Panel>*/}
                  </AnalyticsItem>
                  {/*@ts-ignore*/}
                  <AnalyticsItem title={`Transactions`}>

                    {/*<Panel style={{ margin: '1rem 0' }}>*/}
                      {/*@ts-ignore*/}
                      <TxnList transactions={transactions} />
                    {/*</Panel>*/}

                  </AnalyticsItem>
                </LayoutWrapperAnalytics>
              </Card>
            </div>
          </div>
        </DoubleGlowShadow>
      </div>
    </>
  )
}