import { ChainId } from '@uniswap/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x0bbC860BBf51E8D67EA11db1008ab896Fcd7B9A2',
  [ChainId.TESTNET]: '0x53C43764255c17BD724F74c4eF150724AC50a3ed'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
