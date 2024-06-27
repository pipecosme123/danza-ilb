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

  try {
    // const createEnsayo = await fetchPost({
    //   type: TYPEFETCH.POST,
    //   query: createEnsayos,
    //   variables: { input }
    // });

    const listUsuarios = await fetchPost({
      type: TYPEFETCH.GET,
      query: listUserss
    });

    // console.log({ items: listUsuarios.body.data.listUserss.items });

    const lista = listUsuarios.body.data.listUserss.items.map(item => {
      const addItem = newListAsistentes.filter(({ id }) => id === item.id)[0];
      item.ensayos.push(JSON.stringify(addItem));
      return item;
    });

    console.log({ listUsuarios });
    console.log({ lista });

    // const { id } = createEnsayo.body.data.createEnsayos;

    // const results = await Promise.allSettled(
    //   newListAsistentes.map(asistentes => fetchPost({
    //     type: TYPEFETCH.POST,
    //     query: updateUsers,
    //     variables: {
    //       input: {
    //         id: asistentes.id,
    //         ensayos: JSON.stringify({
    //           id,
    //           registro: asistentes.status
    //         })
    //       }
    //     }
    //   }))
    // );



    return {
      statusCode: listUsuarios.statusCode,
      body: JSON.stringify({ lista })
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