/* Amplify Params - DO NOT EDIT
  API_DANZAILB_GRAPHQLAPIENDPOINTOUTPUT
  API_DANZAILB_GRAPHQLAPIIDOUTPUT
  API_DANZAILB_GRAPHQLAPIKEYOUTPUT
  ENV
  REGION
Amplify Params - DO NOT EDIT */

import { default as fetch, Request } from 'node-fetch';

import { updateUsers, createEnsayos } from '/var/task/graphql/mutations.js';
import { listUserss } from '/var/task/graphql/queries.js';
import { formatDataRequest } from '/var/task/formatDataRequest.js';
import { changeStatus } from '/var/task/changeStatus.js';

const GRAPHQL_ENDPOINT = process.env.API_DANZAILB_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_DANZAILB_GRAPHQLAPIKEYOUTPUT;

const fetchPost = async ({ type, query, variables }) => {

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

  const newListAsistentes = changeStatus(data.listAsistentes)
  const input = formatDataRequest({ ...data, listAsistentes: newListAsistentes });

  try {
    const createEnsayo = await fetchPost({
      query: createEnsayos,
      variables: { input }
    });

    const listUsuarios = await fetchPost({
      query: listUserss
    });

    const { id } = createEnsayo.body.data.createEnsayos;

    const lista = listUsuarios.body.data.listUserss.items.map(item => {
      const { status } = newListAsistentes.filter(({ id }) => id === item.id)[0];
      item.ensayos.push(JSON.stringify({
        id,
        registro: status
      }));
      return item;
    });

    const results = await Promise.allSettled(
      lista.map(({ id, ensayos }) => fetchPost({
        query: updateUsers,
        variables: {
          input: { id, ensayos }
        }
      }))
    );

    const newResult = results.map(({ value }) => {
      if (value.statusCode !== 200) {
        const { nombres, apellidos } = value.body.data.updateUsers;
        return `Hubo un error al registrar la asistencia de ${nombres} ${apellidos}`
      }
      return null
    }).filter(item => item !== null)

    const statusCode = newResult.length === 0 ? 200 : 207;
    const body = statusCode === 200 ? { message: "Se ha registrado el ensayo correctamente" } : { message: "Se ha registrado el ensayo correctamente, pero hubieron asistencias que no se registraron correctamente", results: newResult };


    return {
      statusCode: statusCode,
      body: JSON.stringify({ ...body, id })
    };


  } catch (error) {
    return {
      statusCode: error.statusCode,
      body: JSON.stringify(error.body)
    };
  }
};