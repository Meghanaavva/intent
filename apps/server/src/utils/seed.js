import Intent from '../models/Intent.js';

const DUMMY_INTENTS = [
  { text: "Looking for someone to pair-program a side project this weekend — React + Node.", vibe: "building",   category: "tech" },
  { text: "Anyone want to explore the new café near campus? Need a study spot for finals.", vibe: "casual",     category: "social" },
  { text: "Need 2 more people for a 24hr hackathon team, AI/ML track.",                     vibe: "urgent",     category: "tech" },
  { text: "Going for a late night walk, anyone in the mood to talk about random ideas?",     vibe: "exploring", category: "social" },
  { text: "Working on a startup idea around mental health — looking for a co-founder to bounce ideas off.", vibe: "building", category: "startup" },
  { text: "Anyone free to playtest a small game I built? Takes 10 mins.",                    vibe: "casual",     category: "tech" },
  { text: "Trying to find a gym buddy for early morning sessions, 6-7am.",                   vibe: "exploring", category: "lifestyle" },
  { text: "Need urgent help debugging a production issue — Node/Express/MongoDB.",          vibe: "urgent",     category: "tech" },
];

export async function seedDummyIntents() {
  const count = await Intent.countDocuments();
  if (count > 0) return;

  const now = Date.now();
  const docs = DUMMY_INTENTS.map((d, i) => ({
    ...d,
    anonId: `seed_${Math.random().toString(36).slice(2, 8)}`,
    matched: false,
    createdAt: new Date(now - i * 60_000), // staggered timestamps, newest first
  }));

  await Intent.insertMany(docs);
  console.log(`🌱 Seeded ${docs.length} dummy intents`);
}