import { createClient } from '@supabase/supabase-js'

// Buscamos as variáveis de ambiente para maior segurança (RNF01)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Exportamos o cliente para usar em qualquer página do Next.js
export const supabase = createClient(supabaseUrl, supabaseAnonKey)