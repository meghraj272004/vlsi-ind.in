import Database from 'better-sqlite3';

const db = new Database('vlsi_ind.db');

try {
    const rows = db.prepare('SELECT * FROM contact_submissions').all();
    console.log('\n--- CONTACT FORM SUBMISSIONS ---\n');
    if (rows.length === 0) {
        console.log('No messages found in the database yet.\n');
    } else {
        rows.forEach(row => {
            console.log(`ID: ${row.id}`);
            console.log(`Name: ${row.name}`);
            console.log(`Email: ${row.email}`);
            console.log(`Service: ${row.service}`);
            console.log(`Domain: ${row.domain || 'Not specified'}`);
            console.log(`Message: ${row.message}`);
            console.log(`Time: ${row.created_at}`);
            console.log('--------------------------------\n');
        });
    }
} catch (err) {
    console.error('Error reading database:', err.message);
} finally {
    db.close();
}
