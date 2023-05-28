import { kv } from "@/utils/db.ts";
import { createDefaultSetup } from "./db_setup.ts";
import { Rank } from "./db_rank.ts";

export interface Cult extends InitCult {
  cultistIds: string[];
  ranks: Rank[];
}

interface InitCult {
  name: string;
  creatorId: string;
}

export async function getAllCults(options?: Deno.KvListOptions) {
  const iter = await kv.list<Cult>({ prefix: ["cults"] }, options);
  const items = [];
  for await (const res of iter) items.push(res.value);
  return items;
}

export async function createCult(initCult: InitCult) {
  let res = { ok: false };
  while (!res.ok) {
    const id = crypto.randomUUID();
    const itemKey = ["cults", id, 'basic'];

    const cult: Cult = {
      cultistIds: [],
      ranks: [],
      ...initCult
    };

    res = await kv.atomic()
      .check({ key: itemKey, versionstamp: null })
      .set(itemKey, cult)
      .commit();

    createDefaultSetup(id);
    return res;
  }
}

export async function getCult(cultId: string) {
  const res = await kv.get<Cult>(['cults', cultId, 'basic']);
  return res.value
}

export async function addMember(cultId: string, personaId: string, rank: Rank) {
  let res = { ok: false };
  while (!res.ok) {
    const itemKey = ["cults", cultId, 'basic', 'member_id_to_rank', personaId];

    res = await kv.atomic()
      .check({ key: itemKey, versionstamp: null })
      .set(itemKey, rank)
      .commit();

    return res;
  }
}

export async function removeMember(cultId: string, personaId: string) {
  let res = { ok: false };
  while (!res.ok) {
    const itemKey = ["cults", cultId, 'basic', 'cultistIds', personaId];

    res = await kv.atomic()
      .check({ key: itemKey, versionstamp: null })
      .delete(itemKey)
      .commit();

    return res;
  }
}
