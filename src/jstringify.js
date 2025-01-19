import fs from 'fs'

// Fungsi utama stringify
const jstringifyCore = (value, space = 2, level = 0, seen = new Set()) => {
  const indent = space ? ' '.repeat(space * level) : ''

  return seen.has(value)
    ? '"[Circular]"'
    : (seen.add(value),
      value === null
        ? 'null'
        : typeof value === 'string'
          ? `"${value}"`
          : typeof value === 'number' || typeof value === 'boolean'
            ? `${value}`
            : typeof value === 'bigint'
              ? `${value}`
              : value instanceof Date
                ? `"${value.toISOString()}"`
                : typeof value === 'symbol'
                  ? `"${value.description || ''}"`
                  : typeof value === 'undefined'
                    ? '"undefined"'
                    : value instanceof Map
                      ? `{${[...value.entries()]
                          .map(
                            ([k, v]) =>
                              `${jstringifyCore(k, space, level + 1, seen)}:${jstringifyCore(
                                v,
                                space,
                                level + 1,
                                seen
                              )}`
                          )
                          .join(',')}}`
                      : value instanceof Set
                        ? `[${[...value]
                            .map((v) =>
                              jstringifyCore(v, space, level + 1, seen)
                            )
                            .join(',')}]`
                        : typeof value === 'function'
                          ? (() => {
                              try {
                                const result = value()
                                return jstringifyCore(
                                  result,
                                  space,
                                  level + 1,
                                  seen
                                )
                              } catch {
                                return `"${value
                                  .toString()
                                  .replace(/"/g, '\\"')}"`
                              }
                            })()
                          : Array.isArray(value)
                            ? `[${value
                                .map((item) =>
                                  jstringifyCore(item, space, level + 1, seen)
                                )
                                .join(space ? `,${indent}` : ',')}]`
                            : typeof value === 'object'
                              ? `{${Object.entries(value)
                                  .map(
                                    ([k, v]) =>
                                      `${indent}"${k}":${jstringifyCore(
                                        v,
                                        space,
                                        level + 1,
                                        seen
                                      )}`
                                  )
                                  .join(space ? `,${indent}` : ',')}}`
                              : '"[Unsupported]"')
}

// Fungsi untuk menulis file JSON
const writeFile = (filePath, data, space = 0) => {
  const jsonString = jstringifyCore(data, space)
  fs.writeFileSync(filePath, jsonString, 'utf8')
  console.log(`File berhasil ditulis ke ${filePath}`)
}

// Fungsi untuk membaca file JSON
const readFile = (filePath) => {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error(`Gagal membaca file: ${filePath}`, error)
    throw error
  }
}

// Menggabungkan semua fungsi ke dalam satu objek
export const jstringify = Object.assign(jstringifyCore, {
  writeFile,
  readFile,
})
