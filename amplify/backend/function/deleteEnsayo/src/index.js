/* Amplify Params - DO NOT EDIT
  API_DANZAILB_GRAPHQLAPIENDPOINTOUTPUT
  API_DANZAILB_GRAPHQLAPIIDOUTPUT
  API_DANZAILB_GRAPHQLAPIKEYOUTPUT
  ENV
  REGION
Amplify Params - DO NOT EDIT */

import { default as fetch, Request } from 'node-fetch';

import { updateUsers, deleteEnsayos } from '/var/task/graphql/mutations.js';
import { listUserss } from '/var/task/graphql/queries.js';
import { deleteEnsayoUsers } from '/var/task/helpers/deleteEnsayoUsers.js';

const GRAPHQL_ENDPOINT = process.env.API_DANZAILB_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_DANZAILB_GRAPHQLAPIKEYOUTPUT;

const fetchPost = async ({ query, variables }) => {

  const options = {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, variables })
  };

  const request = new Request(GRAPHQL_ENDPOINT, options);

  let statusCode = 200;
  let response;

  try {
    const response = await fetch(request);
    const body = await response.json();

    if (body.errors) {
      throw {
        statusCode: 400,
        body: body.errors
      };
    }

    return {
      statusCode,
      body
    };

  } catch (error) {
    console.log({ error: error.body });
    throw {
      statusCode: error.statusCode || 400,
      body: {
        errors: [
          {
            status: error.body.path || response.status,
            message: error.body.message || error.message,
            stack: error.body.locations || error.stack
          }
        ]
      }
    };
  }
}

export const handler = async (event) => {

  let info;

  try {
    // info = typeof event === "string" ? JSON.parse(event) : event;
    info = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON format" })
    };
  }


  const { data } = info;

  if (!data) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "'data' is undefined" })
    };
  }

  try {
    const { id } = data;

    await fetchPost({
      query: deleteEnsayos,
      variables: { input: { id } }
    });

    const listUsers = await fetchPost({
      query: listUserss
    });

    const newList = deleteEnsayoUsers({ listUsers, id });

    const results = await Promise.allSettled(
      newList.map(item => fetchPost({
        query: updateUsers,
        variables: { input: item }
      })
      )
    )

    const newResult = results.map(({ value }) => {
      if (value.statusCode !== 200) {
        const { nombres, apellidos } = value.body.data.updateUsers;
        return `Hubo un error al eliminar la asistencia de ${nombres} ${apellidos}`
      }
      return null
    }).filter(item => item !== null)

    const statusCode = newResult.length === 0 ? 200 : 207;
    const body = statusCode === 200 ? { message: "Se ha eliminado el ensayo correctamente" } : { message: "Se ha eliminado el ensayo correctamente, pero hubieron asistencias que no se han eliminado correctamente", results: newResult };


    return {
      statusCode: statusCode,
      body: JSON.stringify({ body })
    };

  } catch (error) {
    return {
      statusCode: error.statusCode,
      body: JSON.stringify(error.body)
    }
  }
};