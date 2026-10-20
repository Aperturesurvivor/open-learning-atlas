const defaultSource = '/Users/josiahwilson/Josiah/Project-Workspace/open-learning-atlas/map/releases/mathematics-v0.3.0-alpha.json'
const source = Deno.args[0] ?? defaultSource
const destination = new URL('../public/data/mathematics-v0.3.0-alpha.json', import.meta.url)

await Deno.copyFile(source, destination)
console.log(`Synced ${source} -> ${destination.pathname}`)

