type Settings = { theme: string; size: number; enabled: boolean }
type Errors = { [K in keyof Settings]: string | null }
const errors: Errors = { theme: null, size: null, enabled: null }
export {}
