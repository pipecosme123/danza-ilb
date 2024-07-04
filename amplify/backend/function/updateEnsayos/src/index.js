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

import { updateUsers, updateEnsayos } from '/var/task/graphql/mutations.js';
import { listUserss, getEnsayos } from '/var/task/graphql/queries.js';
import { formatDataRequest } from '/var/task/helpers/formatDataRequest.js';
import { changeStatus } from '/var/task/helpers/changeStatus.js';

const GRAPHQL_ENDPOINT = process.env.API_DANZAILB_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_DANZAILB_GRAPHQLAPIKEYOUTPUT;
// const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
// const { Sha256 } = crypto;

const TYPEFETCH = Object.freeze({
  POST: "post",
  GET: "get"
})

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

    console.log({ body: body.data.updateUsers });

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
      statusCode: error.statusCode,
      body: {
        errors: {
          status: error.body.path,
          message: error.body.message,
          stack: error.body.locations
        }
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
    const getEnsayo = await fetchPost({
      type: TYPEFETCH.GET,
      query: getEnsayos,
      variables: {
        id: data.id
      }
    });

    const dataRegistrador = getEnsayo.body.data.getEnsayos.registrador;
    const newListAsistentes = changeStatus(data.listAsistentes);
    const input = formatDataRequest({ ...data, listAsistentes: newListAsistentes, dataRegistrador });

    const updateEnsayo = await fetchPost({
      type: TYPEFETCH.POST,
      query: updateEnsayos,
      variables: { input }
    });

    const listUsuarios = await fetchPost({
      type: TYPEFETCH.GET,
      query: listUserss
    });

    const { id } = updateEnsayo.body.data.updateEnsayos;

    const lista = listUsuarios.body.data.listUserss.items.map(item => {

      const index = item.ensayos.findIndex(ensayo => ensayo.includes(id))
      const ensayo = JSON.parse(item.ensayos[index]);
      const { status } = newListAsistentes.filter(({ id }) => id === item.id)[0];

      if (ensayo.registro === status) {
        return null;
      }

      ensayo.registro = status;
      item.ensayos[index] = JSON.stringify(ensayo);
      return item;

    });

    const changes = lista.filter(item => item !== null);

    const results = await Promise.allSettled(
      changes.map(({ id, ensayos }) => fetchPost({
        query: updateUsers,
        variables: {
          input: { id, ensayos }
        }
      }))
    );

    // return {
    //   statusCode: listUsuarios.statusCode,
    //   body: JSON.stringify(results)
    // };

    const newResult = results.map(({ value }) => {
      if (value.statusCode !== 200) {
        const { nombres, apellidos } = value.body.data.updateUsers;
        return `Hubo un error al modificar la asistencia de ${nombres} ${apellidos}`
      }
      return null
    }).filter(item => item !== null)

    const statusCode = newResult.length === 0 ? 200 : 207;
    const body = statusCode === 200 ? { message: "Se ha actualizado el ensayo correctamente" } : { message: "Se ha actualizado el ensayo correctamente, pero hubieron asistencias que no se actualizado correctamente", results: newResult };


    return {
      statusCode: statusCode,
      body: JSON.stringify({ body })
    };


  } catch (error) {
    return {
      statusCode: error.statusCode,
      body: JSON.stringify(error.body)
    };
  }

};