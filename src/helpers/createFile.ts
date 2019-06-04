import path from 'path';
const fsPromise = require('fs').promises;

/**
 * Create file with content. `filepath` and parent dir will be created recursively if not exist
 * @param filepath 
 * @param content 
 */
const createFile = async function(filepath: string, content: string = '') {
    await fsPromise.mkdir(path.dirname(filepath), { recursive: true });
    await fsPromise.writeFile(filepath, content);
};

export default createFile;