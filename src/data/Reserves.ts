import { Interface } from '@ethersproject/abi'
import { Currency, JSBI, Pair, TokenAmount } from '@uniswap/sdk'
//import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { useMemo } from 'react'
import { abi as IUniswapV2PairABI } from '../abis/IPowerswapPair.json' // use our pair abi
import { useActiveWeb3React } from '../hooks'
import { useMultipleContractSingleData } from '../state/multicall/hooks'
import { wrappedCurrency } from '../utils/wrappedCurrency'


const PAIR_INTERFACE = new Interface(IUniswapV2PairABI)

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID
}

export function usePairs(currencies: [Currency | undefined, Currency | undefined][]): [PairState, Pair | null][] {
  const { chainId } = useActiveWeb3React()

  const tokens = useMemo(
    () =>
      currencies.map(([currencyA, currencyB]) => [
        wrappedCurrency(currencyA, chainId),
        wrappedCurrency(currencyB, chainId)
      ]),
    [chainId, currencies]
  )

  const pairAddresses = useMemo(
    () =>
      tokens.map(([tokenA, tokenB]) => {
        return tokenA && tokenB && !tokenA.equals(tokenB) ? Pair.getAddress(tokenA, tokenB) : undefined
      }),
    [tokens]
  )

  const pairReserves = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')
  const pairBalances = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getBalances')
  const pairPrices = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getPrices')
  const pairRs = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getR')

  return useMemo(() => {
    return pairReserves.map((result, i) => {
      const { result: reserves, loading } = result
      const { result: balances,  } = pairBalances[i]
      const { result: prices, } = pairPrices[i]
      const { result: R, } = pairRs[i]

      const tokenA = tokens[i][0]
      const tokenB = tokens[i][1]

      if (loading) return [PairState.LOADING, null]
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
      if (!reserves || !balances || !prices || !R) return [PairState.NOT_EXISTS, null]

      const { reserve0, reserve1 } = reserves
//      const {_balanceBuy0, _balanceBuy1, _balanceSell0, _balanceSell1} = balances
//      const {_buyPrice, _sellPrice} = prices
      const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
/*
      console.log("hello, balanceBuy0", prices[0].toString(), prices[1].toString())
      console.log("halo, balanceBuy0", balances[0].toString(), balances[1].toString(),
      balances[2].toString(), balances[3].toString())
*/
      return [
        PairState.EXISTS,
        new Pair(new TokenAmount(token0, reserve0.toString()), new TokenAmount(token1, reserve1.toString()),
                [new TokenAmount(token0, balances[0].toString()), new TokenAmount(token1, balances[1].toString())],
        [new TokenAmount(token0, balances[2].toString()), new TokenAmount(token1, balances[3].toString())],
        [new TokenAmount(token0, prices[0].toString()), new TokenAmount(token1, prices[1].toString())],
        JSBI.BigInt(R[0])
        )
      ]

    })
  }, [pairReserves, pairBalances, pairPrices, pairRs, tokens])

  /*
  const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')

  return useMemo(() => {
    return results.map((result, i) => {
      const { result: reserves, loading } = result
      const tokenA = tokens[i][0]
      const tokenB = tokens[i][1]

      if (loading) return [PairState.LOADING, null]
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
      if (!reserves) return [PairState.NOT_EXISTS, null]
      const { reserve0, reserve1 } = reserves
      const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
      console.log("hello", reserve0, reserve1)
      return [
        PairState.EXISTS,
        new Pair(new TokenAmount(token0, reserve0.toString()), new TokenAmount(token1, reserve1.toString()))
      ]
    })
  }, [results, tokens])
  */
}

export function usePair(tokenA?: Currency, tokenB?: Currency): [PairState, Pair | null] {
  return usePairs([[tokenA, tokenB]])[0]
}
