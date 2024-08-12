import { FC, useCallback, useEffect, useState } from 'react';
import JsonView from 'react18-json-view';
import { OrderModel, getOrder } from './api';
import { ManualTransfer } from './ManualTransfer';
import { Mesh } from './Mesh';

export const Order: FC<{ orderUuid: string }> = ({ orderUuid }) => {
  const [order, setOrder] = useState<OrderModel | undefined>();
  const [lastUpdate, setLastUpdate] = useState<number | undefined>();

  const getOrderData = useCallback(() => {
    getOrder(orderUuid).then((order) => {
      setOrder(order);
      setLastUpdate(Date.now());
    });
  }, [orderUuid]);

  useEffect(() => {
    getOrderData();
  }, [orderUuid, getOrderData]);

  if (!order) {
    return null;
  }

  return (
    <div>
      <div
        style={{
          border: '1px solid black',
          borderRadius: 30,
          padding: '0 20px 20px 20px',
          marginBottom: 20,
        }}
      >
        <h4>Order info</h4>
        {lastUpdate && new Date(lastUpdate).toISOString()}
        <button onClick={() => getOrderData()}>Refresh</button>
        <JsonView src={order} />
      </div>

      <div style={{ display: 'flex', gap: 50 }}>
        <ManualTransfer orderUuid={orderUuid} />
        <Mesh orderUuid={orderUuid} />
      </div>
    </div>
  );
};
