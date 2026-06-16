// Supabase Auth Module
const SUPABASE_URL = 'https://vovzgflfdwngfuqnxjc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdnpnZmxmZHduZ2Z1cW54amMiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc4MTU5ODQ5NiwiZXhwIjoyMDk3MTc0NDk2fQ.p8e3LcWgBqWxQ3jYk7mN2vR4sT8uY6zA9bC1dE5fG3h';

async function checkAccessToken(token) {
  try {
    const response = await fetch(SUPABASE_URL + '/rest/v1/access_tokens?token=eq.' + token, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY
      }
    });
    const data = await response.json();
    if (data && data.length > 0) {
      const record = data[0];
      if (!record.is_active) return { valid: false, error: 'Token is inactive' };
      if (record.expires_at && new Date(record.expires_at) < new Date()) return { valid: false, error: 'Token expired' };
      return { valid: true, description: record.description };
    }
    return { valid: false, error: 'Token not found' };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}

window.checkAccessToken = checkAccessToken;
