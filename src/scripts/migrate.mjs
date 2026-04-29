import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migrate() {
  const dataDir = path.join(process.cwd(), 'src/data');
  const files = ['products.json', 'reviews.json', 'orders.json', 'users.json'];

  for (const file of files) {
    const tableName = file.replace('.json', '');
    const filePath = path.join(dataDir, file);
    
    if (fs.existsSync(filePath)) {
      console.log(`Migrating ${file} to table "${tableName}"...`);
      const rawData = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(rawData);

      console.log(`Migrating ${data.length} records to "${tableName}"...`);
      const { error } = await supabase
        .from(tableName)
        .upsert(data);

      if (error) {
        console.error(`Error migrating ${file}:`, error.message);
        if (error.hint) console.error(`Hint:`, error.hint);
        if (error.details) console.error(`Details:`, error.details);
      } else {
        console.log(`Successfully migrated ${file}`);
      }
    }
  }
}

migrate();
