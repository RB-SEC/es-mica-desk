-- Gas L2 medido también vía RPC Base (fuente primaria del desk v0.1).
-- Esta query es el espejo en Dune para cuando haya créditos de ejecución.
-- Objetivo: coste EUR estimado de un transfer ERC-20 típico en Base (últimas 24h).
--
-- NOTA: el desk publica el dato RPC (eth_gasPrice + eth_estimateGas USDC Base)
-- porque es reproducible sin depender del plan Dune. Ejecutar esto en Dune
-- solo como contraste.

SELECT
  DATE_TRUNC('hour', block_time) AS hour,
  APPROX_PERCENTILE(gas_price, 0.5) AS gas_price_wei_p50,
  COUNT(*) AS txs
FROM base.transactions
WHERE block_time >= NOW() - INTERVAL '1' day
GROUP BY 1
ORDER BY 1 DESC
