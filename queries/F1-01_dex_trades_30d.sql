-- F1-01 · SELECT + WHERE + GROUP BY
-- Guardar en Dune como: F1-01 dex trades 30d
SELECT
  block_date,
  blockchain,
  COUNT(*) AS number_of_trades,
  SUM(amount_usd) AS trading_volume_usd
FROM dex.trades
WHERE block_date >= NOW() - INTERVAL '30' day
GROUP BY 1, 2
ORDER BY 1 DESC, 4 DESC
