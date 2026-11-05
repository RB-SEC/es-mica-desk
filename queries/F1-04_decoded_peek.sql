-- F1-04 · Explorar tabla decoded
-- Guardar en Dune como: F1-04 decoded peek
SELECT *
FROM uniswap_v3_ethereum.UniswapV3Pool_evt_Swap
WHERE evt_block_time >= NOW() - INTERVAL '1' hour
LIMIT 50
