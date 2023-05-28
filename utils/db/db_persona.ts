import { kv } from "@/utils/db.ts";
import { Resource } from "@/utils/db/db_resource.ts";

export interface Persona extends InitPersona {
  savedResources: Resource[];
  joinDate: Date;
  id: string;
  name: string;
  cultIds: string[];
}

export interface InitPersona {
  name: string;
  description: string;
}

export async function createPersona(initPersona: InitPersona, userId: string) {
  let res = { ok: false };
  while (!res.ok) {
    const id = crypto.randomUUID();
    const personaByUserKey = ["users", userId, 'personas_by_user', id];
    const persona: Persona = {
      ...initPersona,
      id: id,
      savedResources: [],
      joinDate: new Date(),
      cultIds: [],
    };

    res = await kv.atomic()
      .check({ key: personaByUserKey, versionstamp: null })
      .set(personaByUserKey, persona)
      .commit();

    return persona;
  }
}

export async function getPersonasByUserId(userId: string, options?: Deno.KvListOptions) {
  const iter = await kv.list<Persona>({ prefix: ["users", userId, 'personas_by_user'] }, options);
  const items = [];
  for await (const res of iter) items.push(res.value);
  return items;
}


export async function joinCult(userId: string, cultId: string, personaId: string) {
  let res = { ok: false };
  while (!res.ok) {
    const newKey = ["users", userId, 'personas_by_user', personaId, 'ranks'];
    res = await kv.atomic().check({ key: newKey, versionstamp: null }).set(newKey, cultId).commit();
  }

}
