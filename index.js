const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';

const makeCommit = n => {
  if (n === 0) return simpleGit().push();

  const commitMessage = "update";

  const DATE = moment('2023-11-05').format();

  const data = {
    date: DATE,
  };

  console.log(DATE);

  jsonfile.writeFile(FILE_PATH, data, () => {
    simpleGit().add(FILE_PATH).commit(commitMessage, { '--date': DATE }, makeCommit.bind(this, --n));
  });
};

makeCommit(1);