#!/usr/bin/node

import { Client } from 'asana';
import fzf from 'node-fzf';

var args = process.argv;

const client = Client.create({
  "defaultHeaders": {"asana-enable": "string_ids,new_sections"}}
).useAccessToken(process.env.ASANA_TOKEN);

var projectIds = {
  'Project Name': 'project id',
}

client.users.me().then(function(me) {
  const userId = me.gid;
  const workspaceId = me.workspaces[0].gid;

  var tasks = client.tasks.findAll({
    assignee: userId,
    workspace: workspaceId,
    project: projectIds[args[2]]
  })

/*
  var projects = client.projects.findAll({
    assignee: userId,
    workspace: workspaceId,
    opt_pretty: true,
  })
*/

  // console.log(projects)

  return tasks;
  // return projects
}).then(function (response) {
  function processData(responseData) {
    // console.log(responseData)
    // I need to get the project ID as well, somehow
    // so the console log will include the correct url

    var titles = []; var ids = []
    for (var i = 0; i < responseData.length; i++) {
      titles.push(responseData[i].name);
      ids.push(responseData[i].gid);
    }

    fzf(titles, function (result) {
      const {selected, query} = result;

      if (!selected) {
        console.log('No matches for query');
      } else {
        console.log({
          title: selected.value,
          url: `https://app.asana.com/0/${projectIds[args[2]]}/${ids[selected.index]}`
        });
      }
    })

    console.log(`https://app.asana.com/0/${projectIds[args[2]]}/${ids[selected.index]}`)
  }

  processData(response.data);
});
