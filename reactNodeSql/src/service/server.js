import { baseURL } from '../config';

export async function fetchServer(LinkToServer, dataToServer = {}, method = "GET") {
  try {

    const request = {
      method: method,
      headers: { 'Content-Type': 'application/json', },
    }
    if (method !== 'GET') {
      request.body = JSON.stringify(dataToServer);
    }
    const response = await fetch(baseURL + LinkToServer, request);
    if (!response.ok) {
      throw new Error;
    }
    return await response.json();
  }
  catch (error) {
    alert('somthing filed' );
    console.error('Error fetching data:', error);
  }
}
