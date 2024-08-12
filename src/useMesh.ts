import { Link, createLink } from '@meshconnect/web-link-sdk'
import { useEffect, useState } from 'react'

export const useMesh = (): Link | null => {
  const [meshConnection, setMeshConnection] = useState<Link | null>(null)

  useEffect(() => {
    setMeshConnection(
      createLink({
        clientId: 'f5cbc535-7fb8-4963-a8c3-08dc694f6820',
        onIntegrationConnected: authData => {
          console.info('[FRONT CONNECTED]', authData)
        },
        onExit: (error, summary) => {
          if (error) {
            console.error(`[FRONT ERROR] ${error}`)
          }

          if (summary) {
            console.log('Summary', summary)
          }
        },
        onTransferFinished: transferData => {
          console.info('[FRONT TRANSFER FINISHED]', transferData)
          //   {
          //     "status": "success",
          //     "amount": 10,
          //     "symbol": "USDC",
          //     "toAddress": "0xB62b4a804C9c40E5f0233102E6d6AB4B28a53530",
          //     "txId": "0f54671a98e44aad973504c912f203e8",
          //     "networkId": "18fa36b0-88a8-43ca-83db-9a874e0a2288"
          // }


        //   {
        //     "status": "success",
        //     "amount": 10,
        //     "symbol": "USDC",
        //     "toAddress": "3puQqWK7SWFVUGR1in9cKjSzJJPzZ5GwBBTDuwPLXai3",
        //     "txId": "0f54671a98e44aad973504c912f203e8",
        //     "networkId": "0291810a-5947-424d-9a59-e88bb33e999d"
        // }
        },
        onEvent: ev => {
          console.info('[FRONT Event]', ev)
        }
      })
    )
  }, [])

  return meshConnection
}
