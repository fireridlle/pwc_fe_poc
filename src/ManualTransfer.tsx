import { FC, useCallback, useEffect, useState } from 'react';
import JsonView from 'react18-json-view';
import { Asset, depositSent, getAssets, getCryptoPrice, getWalletForManualTransfer } from './api';

export const ManualTransfer: FC<{ orderUuid: string }> = ({ orderUuid }) => {
  const [selectedAsset, setSelectedAsset] = useState<string | undefined>();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [manualDepositWallet, setManualDepositWallet] = useState<{
    walletAddress: string;
    asset: Asset;
    cryptoAmount: number;
  }>();
  const [cryptoPrice, setCryptoPrice] = useState<{
    asset: Asset;
    cryptoAmount: number;
  }>();

  const onGetWalletAddressClick = useCallback(() => {
    if (!selectedAsset) {
      return;
    }
    getWalletForManualTransfer(orderUuid, selectedAsset).then((resp) => setManualDepositWallet(resp));
  }, [orderUuid, selectedAsset]);

  useEffect(() => {
    getAssets().then((assets) => setAssets(assets));
  }, []);

  useEffect(() => {
    if (!selectedAsset) {
      return;
    }
    getCryptoPrice(orderUuid, selectedAsset).then((price) => setCryptoPrice(price));
  }, [orderUuid, selectedAsset]);

  return (
    <div
      style={{
        flex: 1,
        border: '1px solid black',
        borderRadius: 30,
        padding: '0 20px 20px 20px',
      }}
    >
      <h4>Manual Transfer</h4>
      <select style={{ marginBottom: 10 }} value={selectedAsset} onChange={(e) => setSelectedAsset(e.target.value)}>
        <option value="">Select asset</option>
        {assets.map((asset) => (
          <option key={asset.uuid} value={asset.uuid}>
            {asset.cryptoCurrencyCode} {asset.network}
          </option>
        ))}
      </select>
      <JsonView src={cryptoPrice ?? {}} />

      {cryptoPrice && (
        <div>
          <button onClick={onGetWalletAddressClick}>Get Wallet Address For {cryptoPrice.asset.cryptoCurrencyCode}</button>
          <JsonView src={manualDepositWallet ?? {}} />
        </div>
      )}
      {manualDepositWallet && <button onClick={() => depositSent(orderUuid)}>Deposit Sent</button>}
    </div>
  );
};
