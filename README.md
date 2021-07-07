# PowerSwap Interface

[![Lint](https://github.com/Uniswap/uniswap-interface/workflows/Lint/badge.svg)](https://github.com/powerswap/powerswap-interface/actions?query=workflow%3ALint)
[![Tests](https://github.com/Uniswap/uniswap-interface/workflows/Tests/badge.svg)](https://github.com/powerswap/powerswap-interface/actions?query=workflow%3ATests)
[![Styled With Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

An open source interface for PowerSwap -- a protocol for decentralized exchange of Ethereum tokens.

- Website: [powerswap.org](https://powerswap.org/)
- Interface: [app.powerswap.org](https://app.powerswap.org)
- Docs: [powerswap.org/docs/](https://powerswap.org/docs/)
- Twitter: [@PowerSwapProtocol](https://twitter.com/PowerSwapProtocol)
- Reddit: [/r/PowerSwap](https://www.reddit.com/r/PowerSwap/)
- Email: [contact@powerswap.org](mailto:contact@powerswap.org)
- Discord: [PowerSwap](#)
- Whitepaper: [Link](#)

## Accessing the PowerSwap Interface

To access the PowerSwap Interface, use an IPFS gateway link from the
[latest release](https://github.com/PowerSwap/powerswap-interface/releases/latest), 
or visit [app.powerswap.org](https://app.powerswap.org).

## Listing a token

Please see the
[@powerswap/default-token-list](https://github.com/powerswap/default-token-list) 
repository.

## Development

### Install Dependencies

```bash
yarn
```

### Run

```bash
yarn start
```

### Configuring the environment (optional)

To have the interface default to a different network when a wallet is not connected:

1. Make a copy of `.env` named `.env.local`
2. Change `REACT_APP_NETWORK_ID` to `"{YOUR_NETWORK_ID}"`
3. Change `REACT_APP_NETWORK_URL` to e.g. `"https://{YOUR_NETWORK_ID}.infura.io/v3/{YOUR_INFURA_KEY}"` 

Note that the interface only works on testnets where both 
[PowerSwap](https://powerswap.org/docs/smart-contracts/factory/) and 
[multicall](https://github.com/makerdao/multicall) are deployed.
The interface will not work on other networks.

## Contributions

**Please open all pull requests against the `master` branch.** 
CI checks will run against all PRs.

