import { kv } from "@/utils/db.ts";

interface InnerDescription {
  externalUrl: string;
  goal: string;
  internalDescription: string;
}

interface OuterDescription {
  tags: string[]
  externalDescription: string;
}

export interface Setup {
  publiclyListed: boolean;
  showCultistNumber: boolean;
  showChronicle: boolean;
  // visuals: VibeVisuals;
  outerDescription: OuterDescription
  innerDescription: InnerDescription;
}

// interface VibeVisuals {
//   font: string;
//   icon: ImageBitmap;
//   backgroundImage: ImageBitmap
// }

const defaultSetup: Setup = {
  publiclyListed: false,
  showCultistNumber: false,
  showChronicle: false,
  outerDescription: {
    tags: [],
    externalDescription: 'Here goes your public description'
  },
  innerDescription: {
    externalUrl: 'any',
    goal: 'here input your esoteric goal',
    internalDescription: 'here a more elaborate description goes'
  }
}

export async function createDefaultSetup(cultId: string) {
  await createSetup(defaultSetup, cultId);
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

export async function getSetup(cultId: string) {
  const res = await kv.get<Setup>(['cults', cultId, 'setup']);
  return res.value
}
