import toml from 'toml';
import * as yup from 'yup';
import fs from 'fs';

const main = async () => {
  const schema = yup.object({
    alarms: yup.array().of(yup.string()).required(),
    types: yup.array().of(yup.number()).required(),
    http: yup
      .object({
        baseURL: yup.string().url().required(),
        by: yup.string().required()
      })
      .nullable()
      .default(null)
  });

  // read contents from file
  const contents = fs.readFileSync('./config.toml');

  // export Config object from toml.parse
  const config = toml.parse(contents.toString('utf-8')) as Config;

  console.log(schema.validate(config));

  console.log(config);
};

main().catch((err) => console.error(err));

// Config type
type Config = {
  alarms: Array<string>;
  types: Array<number>;
  settings: {
    min: number;
    max: number;
  };
  http: {
    baseURL: string;
    by: string;
  };
};
