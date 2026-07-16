// ============================================================
// Supabase Database Types — auto-generated placeholder
// ============================================================
// Run `npx supabase gen types typescript --linked > src/types/supabase.ts`
// to generate real types from your Supabase project schema.
// ============================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
