// Script to help set up .env.local file from Google service account JSON
// Run with: node scripts/setup-env.js path/to/service-account.json your-sheet-id

const fs = require('fs');
const path = require('path');

// Check command line arguments
const [,, jsonFilePath, sheetId] = process.argv;

if (!jsonFilePath || !sheetId) {
  console.error('\nUsage: node scripts/setup-env.js path/to/service-account.json your-sheet-id\n');
  console.log('Example:');
  console.log('  node scripts/setup-env.js ./my-project-credentials.json 1a2b3c4d5e6f7g8h9i');
  console.log('\nArguments:');
  console.log('  path/to/service-account.json - Path to your Google service account JSON key file');
  console.log('  your-sheet-id - The ID of your Google spreadsheet (from the URL)');
  process.exit(1);
}

try {
  // Read the JSON key file
  const rawJson = fs.readFileSync(path.resolve(process.cwd(), jsonFilePath), 'utf8');
  const credentials = JSON.parse(rawJson);
  
  // Extract needed values
  const { client_email, private_key } = credentials;
  
  if (!client_email || !private_key) {
    console.error('❌ Error: Invalid service account JSON key file. Missing required fields.');
    process.exit(1);
  }
  
  // Create .env.local content
  const envContent = `GOOGLE_CLIENT_EMAIL=${client_email}
GOOGLE_PRIVATE_KEY="${private_key}"
GOOGLE_SHEET_ID=${sheetId}
`;
  
  // Write to .env.local file
  fs.writeFileSync(path.resolve(process.cwd(), '.env.local'), envContent);
  
  console.log('✅ Successfully created .env.local file!');
  console.log('\nContents:');
  console.log(`GOOGLE_CLIENT_EMAIL=${client_email}`);
  console.log('GOOGLE_PRIVATE_KEY="[private key hidden]"');
  console.log(`GOOGLE_SHEET_ID=${sheetId}`);
  
  console.log('\nNext steps:');
  console.log('1. Verify that your spreadsheet is shared with the service account email');
  console.log('2. Make sure your spreadsheet has the correct format');
  console.log('   - First row should have headers: Name, Price, Collection, ImageURL');
  console.log('   - Collection values should be one of: single_chairs, pack_of_chairs, accessories');
  console.log('3. Run the application with: npm run dev');
  
} catch (error) {
  console.error('❌ Error creating .env.local file:');
  console.error(error.message);
  
  if (error.code === 'ENOENT') {
    console.log(`\nThe file "${jsonFilePath}" was not found. Please provide the correct path to your JSON key file.`);
  }
  process.exit(1);
} 