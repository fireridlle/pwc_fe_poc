import { FC, useCallback } from 'react';
import { getMeshToken } from './api';
import { useMesh } from './useMesh';

export const Mesh: FC<{ orderUuid: string }> = ({ orderUuid }) => {
  const meshConnection = useMesh();
  const openMesh = useCallback(
    (integrationId?: string) => {
      getMeshToken({
        orderUuid,
        integrationId,
      }).then((resp) => {
        meshConnection?.openLink(resp.linkToken);
      });
    },
    [orderUuid, meshConnection],
  );

  return (
    <div
      style={{
        flex: 1,
        border: '1px solid black',
        borderRadius: 30,
        padding: '0 20px 20px 20px',
      }}
    >
      <h4>Mesh</h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button onClick={() => openMesh('47624467-e52e-4938-a41a-7926b6c27acf')}>Coinbase</button>
        <button onClick={() => openMesh('9226e5c2-ebc3-4fdd-94f6-ed52cdce1420')}>Binance</button>
        <button onClick={() => openMesh('34aeb688-decb-485f-9d80-b66466783394')}>Metamask (production only)</button>
        <button onClick={() => openMesh('7f4307ea-58c6-4678-9eb2-fec205de5401')}>Trust Wallet (production only)</button>
        <button onClick={() => openMesh()}>Connect another wallet you own</button>
      </div>
    </div>
  );
};
