/* Amplify Params - DO NOT EDIT
  API_DANZAILB_GRAPHQLAPIENDPOINTOUTPUT
  API_DANZAILB_GRAPHQLAPIIDOUTPUT
  API_DANZAILB_GRAPHQLAPIKEYOUTPUT
  ENV
  REGION
Amplify Params - DO NOT EDIT */

// import crypto from '@aws-crypto/sha256-js';
// import { defaultProvider } from '@aws-sdk/credential-provider-node';
// import { SignatureV4 } from '@aws-sdk/signature-v4';
// import { HttpRequest } from '@aws-sdk/protocol-http';
import { default as fetch, Request } from 'node-fetch';

import { updateUsers, createEnsayos } from '/var/task/graphql/mutations.js';
import { listUserss } from '/var/task/graphql/queries.js';
import { formatDataRequest } from '/var/task/formatDataRequest.js';
import { changeStatus } from '/var/task/changeStatus.js';

const GRAPHQL_ENDPOINT = process.env.API_DANZAILB_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_DANZAILB_GRAPHQLAPIKEYOUTPUT;

// const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
// const { Sha256 } = crypto;
// const endpoint = new URL(GRAPHQL_ENDPOINT);

const ATTENDANCE = Object.freeze({
  ASISTENCIA: 'asistencia',
  EXCUSA: 'excusa',
  INASISTENCIA: 'inasistencia',
  FALSE: false,
})

const TYPEFETCH = Object.freeze({
  POST: "post",
  GET: "get"
})

const fetchPost = async ({ type, query, variables }) => {

  const body = type === TYPEFETCH.POST ? { query, variables } : { query };

  const options = {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
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
    throw {
      statusCode: 400,
      body: {
        errors: [
          {
            status: response.status,
            message: error.message,
            stack: error.stack
          }
        ]
      }
    };
  }
}

export const handler = async (event) => {

  let info;
  try {
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
  let response = {};

  try {
    const createEnsayo = await fetchPost({
      type: TYPEFETCH.POST,
      query: createEnsayos,
      variables: { input }
    });

    const listUsuarios = await fetchPost({
      type: TYPEFETCH.GET,
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
        type: TYPEFETCH.POST,
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
      body: JSON.stringify({ body })
    };


    // return {
    //   statusCode: statusCode,
    //   body: JSON.stringify(results)
    // };

  } catch (error) {
    return {
      statusCode: error.statusCode,
      body: JSON.stringify(error.body)
    };
  }

};