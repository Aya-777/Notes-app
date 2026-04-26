import {Client, Databases} from "appwrite";

const config = {
  endpoint: "https://fra.cloud.appwrite.io/v1",
  projectId: "notess-id",
  dbId: 'notes-app-db',
  col: {
    notes: 'notes'
  }
};

const client = new Client();
client.setEndpoint(config.endpoint).setProject(config.projectId);

const database = new Databases(client);

export {client, database, config};