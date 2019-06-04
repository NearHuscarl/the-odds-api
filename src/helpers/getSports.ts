import fs from 'fs';
import dotenv from 'dotenv';
import TheOddsAPI from '../index';
import createFile from './createFile';

dotenv.config();

const getApiKey = () => {
    if (!process.env.YOUR_API_KEY) {
        throw new Error('No API Key specified. Please create an environment variable named YOUR_API_KEY by following guide in README.md');
    }
    return process.env.YOUR_API_KEY;
}

const getSports = async () => {
    const filePath = 'src/sport.ts';
    await createFile(filePath);
    const stream = fs.createWriteStream(filePath, { flags: 'a' });
    const theOddsAPI = new TheOddsAPI(getApiKey());

    await theOddsAPI.getSports({ all: true }).then((result) => {
        const stream = fs.createWriteStream(filePath, { flags: 'a' });
        
        stream.write('enum Sport {\n');
        result.data.forEach((sport) => {
            stream.write(`    /** ${sport.title} - ${sport.details} */\n`);
            stream.write(`    ${sport.key} = '${sport.key}',\n`);
        })
        stream.write('}\n\n');
        stream.write('export default Sport;');

        console.log(`Update ${result.data.length} sports`)
    });

    stream.end();
}

getSports();