import * as fs from 'fs';
import path from 'path';
import process from 'process';

import * as yaml from 'js-yaml';
import { Connection, DataSource, Repository } from 'typeorm';

export async function loadFixtures(
  name: string,
  dataSource: DataSource
): Promise<any> {
  let items: any[] = [];
  const filePath = process.cwd() + `/src/orm/fixtures/${name}.yml`;
  try {
    if (fs.existsSync(filePath)) {
      const file: any = yaml.load(fs.readFileSync(filePath, 'utf8'));
      if (file) {
        items = file['fixtures'];
      } else {
        return;
      }
    }
  } catch (e) {
    console.log('fixtures error', e);
  }

  if (!items) {
    return;
  }
  await Promise.all([
    items.forEach(async (item: any) => {
      const entityName = Object.keys(item)[0];
      const data = item[entityName];
      return await dataSource
        .createQueryBuilder()
        .insert()
        .into(entityName)
        .values(data)
        .execute();
    }),
  ]);

  const directory = process.cwd() + `/src/orm/fixtures/`;
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
}
