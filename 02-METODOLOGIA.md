# Metodología (v0.1 · 05/11/2026)

| Capa | Fuente | Fecha consulta | Tipo |
|------|--------|----------------|------|
| CASP ES | [PDF CNMV PSC](https://www.cnmv.es/Docportal/Proveedores-Servicios-Criptoactivos/Listado_ProveedoresCriptoactivos.pdf) (copia local `data/cnmv-psc.pdf`) | 05/11/2026 | Off-chain oficial |
| EURC supply | [Circle API](https://api.circle.com/v1/stablecoins) | 05/11/2026 | Issuer on-chain aggregate |
| Wallet / Pro fees | [Wallet](https://support.bit2me.com/en/support/solutions/articles/35000258262) · [Pro](https://support.bit2me.com/en/support/solutions/articles/35000172197-bit2me-pro-fees-and-limits) | 05/11/2026 | Tarifa pública |
| Gas L2 USDC Base | RPC `base.publicnode.com` eth_gasPrice + eth_estimateGas · ETH/EUR Coinbase | 05/11/2026 | Medido · `data/gas-base-usdc-2026-11-05.json` |

## Comparaciones válidas

- **3A** Wallet vs Pro = rutas de **compra**.
- **3B** Transfer L2 = operación **posterior** a la compra. Nunca en la misma tabla como si fuera alternativa de compra.

## CNMV · fechas verificadas

Open Bank y Cecabank: **24/07/2025** confirmado en PDF oficial redescargado 05/11/2026. Resto de filas ES del desk cruzado 1:1 el mismo día.

## Gas y Dune

Dato publicado del gas = medición RPC (reproducible). SQL de contraste en `queries/F1-gas_base_usdc_transfer.sql` para el perfil `ruff32` cuando haya créditos de ejecución.

## Anti-claims

No decir: retail ES total · volumen Bit2Me on-chain · USDT→CEX = España · SEPA on-chain · “comprar por €0,0006 en L2”.
