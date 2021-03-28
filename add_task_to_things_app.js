import { exec } from 'child_process';
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Enter todo title: ', (title) => {
  var auth = 'things auth code';

  var data = [];

  // things:///show?id=A780122E-7AC8-4FA0-A102-C04D4131E211
  data.push(JSON.stringify({
    "type": "to-do", "operation":"create", "attributes": {
      "title": title,
      "deadline": "5 pm",
      "list-id": "A780122E-7AC8-4FA0-A102-C04D4131E211"
      }
  }));

  var url = 'things:///json?data=' + JSON.stringify(data);

  exec('open ' + url);
  // console.log(url)
  readline.close();
});


