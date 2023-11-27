### UD02 - Sidney Silva Braz de Oliveira 2º DAW
# Maneig de la Sintaxi en JavaScript

## Metròpolis

Ens son donades tres variables que contenen informació sobre una ciutat:
- `boolean esCapital`
- `int nombreDeCiutadans`
- `double importPerCiutada`

Amb el següent significat:

- `esCapital` és cert si només si la ciutat és capital.
- `nombreDeCiutadans` és el nombre de ciutadans d'aquesta ciutat.
- `impostPerCiutada` és l'impost mitjà mensual que paga un ciutadà de la ciutat.

Per a nosaltres, una **metròpolis** serà una ciutat si:
- Bé és una **capital amb més de 100.000 ciutadans** o
- Bé és una ciutat amb **més de 200.000 ciutadans i una renda mitjana de 720.000.000 a l'any.**

Doneu una expresió booleana amb les tres variables que sigui certa si i només si la ciutat és una metròpolis.

## Resposta.

Constantes del enunciado:

```js
const ES_CAPITAL = true; // es capital
const NCsM = 100000; // número ciudadanos mínimo (100k)
const MCsMD = 200000; // número ciudadanos mínimo (200k)
const IMM = 720000000; // impuesto medio mínimo
```
  
Variables de una ciudad x que he elegido para comparar. En este caso he elegido Madrid con números inventados.

```js
let ipc_madrid = 2500.30 * 12;
let nombreDeCiutadans = 200000;
let importPerCiutada = ipc_madrid * n_habitantes_madrid;
let esCapital = true;
```

Expresió booleana:
```js
if (esCapital == ES_CAPITAL && nombreDeCiutadans >= NCsM || nombreDeCiutadans >= NCsMD && importPerCiutada >= IMM) {
    console.log("La ciudat es una metròpolis.");
}
else {
    console.log("La ciudat NO es una metròpolis.");
}
```
