const url = 'https://payments-api.dev.crypto.shift4.com/v1'

export interface OrderModel {
  uuid: string
  fiatCurrencyCode: string
  fiatAmount: string
}

export interface Asset {
  uuid: string
  network: string
  cryptoCurrencyCode: string
}

export const getCryptoPrice = (
  orderUuid: string,
  assetUuid: string
): Promise<{ cryptoAmount: number; asset: Asset }> => {
  return fetch(`${url}/orders/${orderUuid}/crypto-price?assetUuid=${assetUuid}`)
    .then(resp => resp.json())
    .then(({ data }) => data)
}

export const getWalletForManualTransfer = (
  orderUuid: string,
  assetUuid: string
): Promise<{ walletAddress: string; asset: Asset; cryptoAmount: number }> => {
  return fetch(`${url}/orders/${orderUuid}/manual-deposit-wallet`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ assetUuid })
  })
    .then(resp => resp.json())
    .then(({ data }) => data)
}

export const depositSent = async (orderUuid: string): Promise<void> => {
  await fetch(`${url}/orders/${orderUuid}/deposit-sent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(resp => resp.json())
    .then(({ data }) => data)
}

export const getAssets = (): Promise<Asset[]> => {
  return fetch(`${url}/assets`)
    .then(resp => resp.json())
    .then(({ data }) => data.assets)
}

export const getOrder = (orderUuid: string): Promise<OrderModel> => {
  return fetch(`${url}/orders/${orderUuid}`)
    .then(resp => resp.json())
    .then(({ data }) => data)
}

export const getMeshToken = ({
  orderUuid,
  integrationId
}: {
  orderUuid: string
  integrationId?: string
}): Promise<{ linkToken: string }> => {
  return fetch(`${url}/orders/${orderUuid}/mesh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ integrationId })
  })
    .then(resp => resp.json())
    .then(({ data }) => data)
}
