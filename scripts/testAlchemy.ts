
const key = Deno.env.get('ALCHEMY_HTTPS_KEY')
const response = await fetch(key, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_getBlockByNumber',
    params: ['latest', false],
    id: 0,
  }),
});

const data = await response.json();
console.log(data);
