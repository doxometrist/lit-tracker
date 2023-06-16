
const key = Deno.env.get('INFURA_IPFS_KEY');
const secret = Deno.env.get('INFURA_IPFS_KEY_SECRET');
const endpoint = Deno.env.get('INFURA_IPFS_ENDPOINT');
const auth = btoa(`${key}:${secret}`);

// https://docs.infura.io/infura/networks/ipfs/http-api-methods/add
export async function uploadJsonToIpfs(object: string) {

  const response = await fetch(`${endpoint}/api/v0/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`,
    },
    body: object,
  });

  const data = await response.json();
  console.log(data);
}

// https://docs.infura.io/infura/networks/ipfs/http-api-methods/get
export async function downloadItemFromIpfs(listId: string): Promise<JSON> {
  const url = getIpfsAddress(listId)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`,
    },
  });
  console.log(response);

  const data = await response.json();
  console.log(data);
  return data;
}

export function getIpfsAddress(listId: string): string {
  return `${endpoint}/api/v0/get?arg=${listId}`
  // const url = new URL(`${endpoint}/api/v0/get? arg = ${listId}`);
  // return url
}
