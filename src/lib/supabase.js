import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wnnoiygoouxjhpeanelc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indubm9peWdvb3V4amhwZWFuZWxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4Mzg2OTcsImV4cCI6MjA5MzQxNDY5N30.a_ddKDAtyC__C3HwqwU4JFdSvdaSOyT4vfLS1YuAlrQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)