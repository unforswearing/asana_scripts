import { exec } from 'child_process';
import request from 'request';

const projectId = '';

var token = process.env.ASANA_TOKEN;

var headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + token
};

var options = {
    url: `https://app.asana.com/api/1.0/projects/${projectId}/tasks`,
    headers: headers
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Successfully retrieved tasks from Asana')
    }
}

// var data = request(options, callback)
// data = data.toString().replace('undefined', '');

var response = request(options, callback);

var tasks = [];

for (var i = 0; i < response.length; i++) {
  var name = response[i].name;
  var gid = response[i].gid;

  var isNotCompleted = (
    !name.match(/(Week Of|Later|Done)/i)
  )

  if (isNotCompleted) {
    console.log(name)
    console.log(gid)
    tasks.push(JSON.stringify({
      "type":"to-do", "operation":"create", "attributes": {
        "title": name,
        "deadline": "this friday",
        "list": "Weekly Plans",
        "notes": "gid: " + gid
      }
    }));
  }
}

// var thingsUrl = 'things:///json?data=[' + tasks + ']'
// exec('/usr/local/bin/terminal-notifier -message "Adding tasks to Things.app"')
// exec('open ' + thingsUrl);

