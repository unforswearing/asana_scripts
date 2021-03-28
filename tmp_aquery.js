import { exec } from 'child_process';
import request from 'request';

var args = process.argv;;

async function tasks() {
  let result = exec('bash getTasksForProject.bash "args[2]"');
  return result
};

tasks().then((data) => { console.log(data.data) })
