/* Amplify Params - DO NOT EDIT
    ENV
    REGION
    STORAGE_DANZAILB275D0240_BUCKETNAME
Amplify Params - DO NOT EDIT */

const { DynamoDBClient, TransactWriteItemsCommand } = require("@aws-sdk/client-dynamodb");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { v5: uuid5, v1: uuid1 } = require('uuid');

const csvToJSON = (csvString) => {
  const rows = csvString
    .split("\r\n");

  const headers = rows[0]
    .split(",");

  const jsonData = [];
  for (let i = 1; i < rows.length; i++) {

    const values = rows[i]
      .split(",");

    const obj = {};

    for (let j = 0; j < headers.length; j++) {

      const key = headers[j]
        .trim();
      const value = values[j]
        .trim();

      obj[key] = value;
    }

    jsonData.push(obj);
  }

  return jsonData;
}

const transact = (arr) => {

  let putTransacts = [];

  for (let i = 0; i < arr.length; i++) {
    const { tipoId, numId, nombres, apellidos, fechaNacimiento, direccion, telefono, genero } = arr[i];

    const idDB = uuid5(process.env.NAMESPACE, uuid1());

    const put = {
      Put: {
        Item: {
          "id": { "S": idDB },
          "tipoId": { "S": tipoId },
          "numId": { "S": numId },
          "nombres": { "S": nombres },
          "apellidos": { "S": apellidos },
          "fechaNacimiento": { "S": fechaNacimiento },
          "direccion": { "S": direccion },
          "telefono": { "S": telefono },
          "genero": { "S": genero }
        },
        TableName: process.env.TABLE_NAME
      }
    };
    putTransacts.push(put);
  }

  return putTransacts;
}

exports.handler = async (event) => {

  const config = {
    region: process.env.REGION
  };

  const S3_client = new S3Client(config);
  const BD_client = new DynamoDBClient(config);

  try {

    const input = {
      Bucket: process.env.STORAGE_DANZAILB275D0240_BUCKETNAME,
      Key: "listadoUsuariosEjemplo.csv"
    };

    const command = new GetObjectCommand(input);
    const file = await S3_client.send(command);

    const streamToString = await file.Body?.transformToString();

    const res = csvToJSON(streamToString);

    const dataTransact = transact(res);

    const commandDB = new TransactWriteItemsCommand({
      TransactItems: dataTransact
    });

    const response = await BD_client.send(commandDB);
    console.log(response);

    return {
      httpStatusCode: 200,
      body: "El archivo se ha cargado correctamente"
    }

  } catch (error) {
    console.log({ ERROR: error });
    return {
      httpStatusCode: 500,
      body: "Se ha producido un error al cargar archivo .csv"
    }
  }

};
