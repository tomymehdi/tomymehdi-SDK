import axios from 'axios';

export function helloWorld() {
  const message = 'Hello World from my example modern npm package!';
  return message;
}

export function goodBye() {
  const message = 'Goodbye from my example modern npm package!';
  return message;
}

export async function externalRESTApi(): Promise<any> {
  const result = await axios.get('https://the-one-api.dev/v2/book');
  return result;
}

export async function externalRESTApi2(): Promise<any> {
  const result = await axios.get('https://the-one-api.dev/v2/book/1');  
  return result;
}

export default {
  helloWorld,
  goodBye,
  externalRESTApi,
};
