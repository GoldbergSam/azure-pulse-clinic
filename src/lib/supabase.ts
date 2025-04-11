
import { createClient } from '@supabase/supabase-js';

// Check if environment variables are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key length:', supabaseAnonKey ? supabaseAnonKey.length : 0);

// Create a mock or real client based on available credentials
let supabase;

// If we don't have credentials, use a mock implementation
if (!supabaseUrl || !supabaseAnonKey) {
  console.log('Using mock Supabase client - local development mode');
  
  // This is a basic in-memory store to simulate a database
  const mockDb = {
    patients: [],
    vitals_data: []
  };
  
  // Mock implementation of Supabase client
  supabase = {
    from: (table) => ({
      select: (columns) => ({
        order: (column, options: { ascending?: boolean } = {}) => ({
          eq: (field, value) => ({
            single: () => {
              const item = mockDb[table]?.find(record => record[field] === value);
              return Promise.resolve({ data: item || null, error: null });
            },
            async: () => {
              const items = mockDb[table]?.filter(record => record[field] === value) || [];
              return Promise.resolve({ data: items, error: null });
            }
          }),
          async: () => {
            // Sort the data if needed
            const sortedData = [...(mockDb[table] || [])];
            if (column && sortedData.length > 0) {
              sortedData.sort((a, b) => {
                if (options.ascending) {
                  return a[column] > b[column] ? 1 : -1;
                } else {
                  return a[column] < b[column] ? 1 : -1;
                }
              });
            }
            return Promise.resolve({ data: sortedData, error: null });
          }
        }),
        eq: (field, value) => ({
          single: () => {
            const item = mockDb[table]?.find(record => record[field] === value);
            return Promise.resolve({ data: item || null, error: null });
          },
          async: () => {
            const items = mockDb[table]?.filter(record => record[field] === value) || [];
            return Promise.resolve({ data: items, error: null });
          }
        }),
        async: () => {
          return Promise.resolve({ data: mockDb[table] || [], error: null });
        }
      }),
      insert: (records) => ({
        select: () => {
          if (!mockDb[table]) {
            mockDb[table] = [];
          }
          
          const insertedRecords = Array.isArray(records) ? records : [records];
          
          // Generate IDs for new records
          const newRecords = insertedRecords.map(record => ({
            id: Math.max(0, ...(mockDb[table].map(r => r.id || 0))) + 1,
            created_at: new Date().toISOString(),
            ...record
          }));
          
          // Add to mock database
          mockDb[table].push(...newRecords);
          
          return Promise.resolve({ data: newRecords, error: null });
        }
      }),
      update: (updates) => ({
        eq: (field, value) => ({
          select: () => {
            if (!mockDb[table]) {
              return Promise.resolve({ data: null, error: { message: 'Table not found' } });
            }
            
            const index = mockDb[table].findIndex(record => record[field] === value);
            if (index === -1) {
              return Promise.resolve({ data: null, error: { message: 'Record not found' } });
            }
            
            mockDb[table][index] = { ...mockDb[table][index], ...updates };
            
            return Promise.resolve({ data: [mockDb[table][index]], error: null });
          }
        })
      }),
      count: () => ({
        head: () => {
          return Promise.resolve({ count: mockDb[table]?.length || 0, error: null });
        }
      }),
    })
  };
} else {
  // Use the real Supabase client
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
