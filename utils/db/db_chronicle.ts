import { kv } from "@/utils/db.ts";
import { Cult } from "@/utils/db/db_cult.ts";
import { Setup } from "@/utils/db/db_setup.ts";

// READONLY
interface Chronicle {
  timeline: DayState;
  foundingDate: Date;
}

interface DayState {
  cultists: number;
  posts: Announcement[];
}

interface Announcement {
  contents: string;
  title: string;
  visibilityMinOrder: number;
  date: Date;
}

export async function getChronicle(cultId: string) {
  const res = await kv.get<Chronicle>(['cults', cultId, 'chronicle']);
  return res.value
}


export async function updateChronicle(cultId: string) {
  // get the number of cultists
  // add together with the number of posts
  let res  = {ok:false}
  while (!res.ok) {
    const chronicleKey = ['cults', cultId, 'chronicle'];
    const cult = await kv.get<Cult>(['cults', cultId,])

  }
}

export async function createSetup(setup: Setup, cultId: string) {
  let res = { ok: false };
  while (!res.ok) {
    const itemKey = ["cults", cultId, 'setup'];

    res = await kv.atomic()
      .check({ key: itemKey, versionstamp: null })
      .set(itemKey, setup)
      .commit();

    return setup;
  }
}