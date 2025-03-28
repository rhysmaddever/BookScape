import { readFile } from 'fs/promises';
import { writeFile } from 'fs/promises';

export async function importBooks() {
  try {
    const rawJson = await readFile(new URL('books.json', import.meta.url));
    return JSON.parse(rawJson);
  } catch (error) {
    console.error('Error importing books:', error);
    return null;
  }
}

export async function exportBooks(books) {
  try {
    const json = JSON.stringify({ books }, null, 2);
    await writeFile('books.json', json);
    console.log('Books exported successfully');
  } catch (error) {
    console.error('Error exporting books:', error);
  }
}
