import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'
const files = []
async function walk(dir) { for (const item of await readdir(dir, { withFileTypes: true })) { const p = join(dir, item.name); if (item.isDirectory()) await walk(p); else files.push({ path: p, size: (await stat(p)).size }) } }
await walk('dist')
const tooLarge = files.filter(file => file.size > 25 * 1024 * 1024)
if (!files.length || files.length > 20000 || tooLarge.length) throw new Error('Pages limits exceeded: ' + JSON.stringify({ count: files.length, tooLarge }))
console.log('Pages asset check passed:', files.length, 'files; largest', Math.max(...files.map(f => f.size)), 'bytes')
