-- F1-05 · Puente al desk (rails EUR) — NO es retail ES
-- Guardar en Dune como: F1-05 eur stable transfers peek
-- Si falla: Catálogo → stablecoins_multichain.* → ajustar columnas en notas-schema.md
SELECT
  block_date,
  blockchain,
  symbol,
  COUNT(*) AS n_transfers,
  SUM(amount_usd) AS volume_usd
FROM stablecoins_multichain.transfers
WHERE
  block_date >= NOW() - INTERVAL '7' day
  AND symbol IN ('EURC', 'EURCV', 'EUROP', 'EURI')
GROUP BY 1, 2, 3
ORDER BY 1 DESC, 5 DESC
