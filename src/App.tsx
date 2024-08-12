import React, { useEffect, useState } from 'react';
import { Order } from './Order';

import 'react18-json-view/src/style.css';

export const App: React.FC = () => {
  const [orderUuid, setOrderUuid] = useState<string | null>();

  const { search } = window.location;

  useEffect(() => {
    const params = new URLSearchParams(search);
    setOrderUuid(params.get('orderUuid'));
  }, [search]);

  if (!orderUuid) {
    return <div>No orderUuid query param</div>;
  }

  return (
    <div style={{ margin: 10 }}>
      <Order orderUuid={orderUuid} />
    </div>
  );
};

export default App;
