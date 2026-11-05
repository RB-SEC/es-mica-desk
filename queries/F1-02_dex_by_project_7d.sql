-- F1-02 · GROUP BY más fino (proyecto + chain)
-- Guardar en Dune como: F1-02 dex by project 7d
SELECT
  block_date,
  blockchain,
  project,
  COUNT(*) AS number_of_trades,
  SUM(amount_usd) AS trading_volume_usd
FROM dex.trades
WHERE
  block_date >= NOW() - INTERVAL '7' day
  AND blockchain IN ('base', 'arbitrum', 'ethereum')
GROUP BY 1, 2, 3
ORDER BY 1 DESC, 5 DESC
