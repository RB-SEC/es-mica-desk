-- F1-03 · JOIN prices.usd + decoded Transfer USDC eth
-- Guardar en Dune como: F1-03 join prices usd
-- Si timeout: baja INTERVAL a '1' day
SELECT
  DATE_TRUNC('day', e.evt_block_time) AS day,
  COUNT(*) AS transfers,
  SUM(CAST(e.value AS DOUBLE) / 1e6 * p.price) AS usd_volume_est
FROM erc20_ethereum.evt_Transfer e
LEFT JOIN prices.usd p
  ON p.minute = DATE_TRUNC('minute', e.evt_block_time)
 AND p.contract_address = e.contract_address
 AND p.blockchain = 'ethereum'
WHERE
  e.evt_block_time >= NOW() - INTERVAL '3' day
  AND e.contract_address = 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
GROUP BY 1
ORDER BY 1 DESC
