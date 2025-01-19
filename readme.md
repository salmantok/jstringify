# jstringify

`jstringify` adalah utilitas `JSON.stringify()` JavaScript. Mendukung tipe data primitif, tipe data kompleks seperti array, object, Map, dan Set, serta menangani referensi siklik secara otomatis.

## API

### `jstringify`

#### Parameter

1. `value` (wajib):  
   Nilai yang akan dibuat.  
   Tipe: `any`.

2. `space` (opsional):  
   Jumlah spasi untuk indentasi dalam format JSON-like. Nilai default adalah `0` (tidak ada indentasi).  
   Tipe: `number`.

3. `level` (opsional):  
   Tingkat indentasi saat ini. Nilai ini digunakan secara internal oleh fungsi rekursif. Default adalah `0`.  
   Tipe: `number`.

4. `seen` (opsional):  
   Set yang melacak referensi object yang telah diproses untuk mendeteksi siklus. Default adalah `Set` kosong.  
   Tipe: `Set`.

#### Fitur

1. Mendukung tipe data berikut:

   - `null`
   - `string`
   - `number`
   - `boolean`
   - `bigint`
   - `Date`
   - `Symbol`
   - `function`
   - `Map`
   - `Set`
   - `Array`
   - `Object`

2. Penanganan siklus referensi:
   Jika terdapat referensi siklik pada object, nilai `"[Circular]"` akan dimasukkan.

3. Indentasi fleksibel:
   Parameter `space` menentukan jumlah spasi untuk indentasi yang menyerupai format JSON. Jika `space = 0`, hasilnya akan dalam satu baris tanpa spasi tambahan.

4. Konversi property kompleks:
   - Object diubah menjadi pasangan kunci-nilai.
   - Map diubah menjadi format `{key:value}`.
   - Set diubah menjadi format `[value1,value2,...]`.

### `writeFile`

#### Parameter

- `filePath` (wajib): Lokasi file tempat data akan ditulis.
- `data` (wajib): Object atau data yang akan ditulis ke file.
- `space` (opsional): Jumlah spasi untuk indentasi dalam file JSON (default: `0`).

### `readFile`

#### Parameter

- `filePath` (wajib): Lokasi file JSON yang akan dibaca.

## Contoh Penggunaan

```js
// esm
import { jstringify } from 'jstringify'
// commonjs
const { jstringify } = require('jstringify')

const file = './data.json'

const obj = {
  name: 'Salman',
  timestamp: new Date(),
  largeNumber: 1234567890123456768n,
  symbolKey: Symbol('unique'),
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),
  greet: () => 'Hello',
}

jstringify.writeFile(file, obj, 2)
console.log(jstringify.readFile(file))
console.log(jstringify(obj, 2))

const a = {}
const b = { a }
a.b = b
console.log(jstringify(a, 2))

const data = { nama: 'Salman' }
const data2 = { negara: 'Indonesia' }
data.tempat_tinggal = data2
console.log(jstringify(data, 2))
```

> Catatan: Tidak mendukung property non-enumerable atau getter.

## Donasi

[Ko-fi](https://ko-fi.com/salmantok)

## Lisensi

[MIT](LICENSE)
