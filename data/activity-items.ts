export type ActivitySeedItem = {
  slug: string;
  title: string;
  homeVersion: string;
  officeVersion: string;
  remoteVersion?: string;
  why: string;
  safetyNote: string;
  tags: string[];
};

const defaultSafety = "Skip this if it causes pain or is not appropriate for your situation.";

export const activityItems: ActivitySeedItem[] = [
  {
    slug: "slow-squats",
    title: "Ten slow squats",
    homeVersion: "Do 10 slow squats, keeping the movement easy and controlled.",
    officeVersion: "Stand up, stretch, and take a one-minute walk instead.",
    remoteVersion: "Move your chair back and do 6-10 comfortable squats.",
    why: "A short lower-body movement break can help circulation and attention reset.",
    safetyNote: defaultSafety,
    tags: ["legs", "focus", "home"]
  },
  {
    slug: "desk-neck-mobility",
    title: "Gentle neck reset",
    homeVersion: "Slowly look left, right, down, and forward twice. Keep the range comfortable.",
    officeVersion: "Same movement, tiny range. Keep it subtle and relaxed.",
    remoteVersion: "Pair it with one slow shoulder roll.",
    why: "Gentle mobility can interrupt stiffness from screen-focused posture.",
    safetyNote: defaultSafety,
    tags: ["office", "mobility", "neck"]
  },
  {
    slug: "box-breathing-minute",
    title: "One-minute box breath",
    homeVersion: "Inhale for 4, hold for 4, exhale for 4, hold for 4. Repeat three times.",
    officeVersion: "Do the same quietly at your desk.",
    remoteVersion: "Look away from the screen while you breathe.",
    why: "A simple breathing rhythm can make the next work block feel cleaner.",
    safetyNote: defaultSafety,
    tags: ["breathing", "office", "calm"]
  },
  {
    slug: "stair-flight",
    title: "One flight of stairs",
    homeVersion: "Walk one flight of stairs or do one easy lap around your room.",
    officeVersion: "Take one flight of stairs or walk to get water.",
    remoteVersion: "Walk to another room and back at an easy pace.",
    why: "Brief walking can increase blood flow without turning the break into a workout.",
    safetyNote: defaultSafety,
    tags: ["walking", "office", "energy"]
  },
  {
    slug: "wrist-mobility",
    title: "Wrist mobility snack",
    homeVersion: "Open and close your hands 10 times, then make slow wrist circles.",
    officeVersion: "Do small wrist circles under the desk.",
    remoteVersion: "Add a gentle forearm stretch if it feels good.",
    why: "Tiny mobility breaks can ease repetitive keyboard and mouse posture.",
    safetyNote: defaultSafety,
    tags: ["wrist", "office", "mobility"]
  },
  {
    slug: "wall-pushups",
    title: "Five wall push-ups",
    homeVersion: "Do 5-10 wall push-ups at a comfortable angle.",
    officeVersion: "Take a short walk or climb one flight of stairs instead.",
    remoteVersion: "Use a wall or sturdy counter, staying easy and controlled.",
    why: "A light strength movement can wake up the upper body without needing equipment.",
    safetyNote: defaultSafety,
    tags: ["strength", "home", "upper-body"]
  },
  {
    slug: "shoulder-rolls",
    title: "Shoulder roll reset",
    homeVersion: "Roll your shoulders slowly backward 8 times, then forward 8 times.",
    officeVersion: "Make the movement smaller and pair it with one deep breath.",
    remoteVersion: "Stand up while doing the rolls if you can.",
    why: "Shoulder rolls can break up static desk posture and signal a mental reset.",
    safetyNote: defaultSafety,
    tags: ["shoulders", "office", "mobility"]
  },
  {
    slug: "look-far-away",
    title: "Look far away",
    homeVersion: "Look out a window or at a distant point for 20 seconds.",
    officeVersion: "Look across the room or out a window without staring at another screen.",
    remoteVersion: "Stand near a window if possible.",
    why: "Looking away from the screen gives your eyes and attention a quick break.",
    safetyNote: defaultSafety,
    tags: ["eyes", "office", "calm"]
  },
  {
    slug: "one-minute-walk",
    title: "One-minute walk",
    homeVersion: "Walk around your room or hallway for one minute.",
    officeVersion: "Walk to water, a printer, or a quiet hallway and back.",
    remoteVersion: "Step outside your workspace and return slowly.",
    why: "A tiny walk can reduce stiffness and mark a clean boundary between tasks.",
    safetyNote: defaultSafety,
    tags: ["walking", "office", "focus"]
  },
  {
    slug: "calf-raises",
    title: "Ten calf raises",
    homeVersion: "Stand near a wall and do 10 gentle calf raises.",
    officeVersion: "Do 5 subtle calf raises while standing, or take a short walk instead.",
    remoteVersion: "Use a wall or chair for balance.",
    why: "Calf raises are a compact way to get lower-leg movement after sitting.",
    safetyNote: defaultSafety,
    tags: ["legs", "office", "circulation"]
  },
  {
    slug: "back-extension",
    title: "Standing back reset",
    homeVersion: "Stand up, place hands on hips, and gently lean back once or twice.",
    officeVersion: "Stand tall and gently open your chest without a big lean.",
    remoteVersion: "Pair it with a slow inhale.",
    why: "A small posture change can counter a long forward-leaning desk position.",
    safetyNote: defaultSafety,
    tags: ["back", "office", "mobility"]
  },
  {
    slug: "ankle-circles",
    title: "Ankle circles",
    homeVersion: "Lift one foot and circle the ankle 8 times each direction, then switch.",
    officeVersion: "Do small ankle circles under the desk.",
    remoteVersion: "Hold a wall or chair if standing.",
    why: "Ankle movement is quiet, easy, and helps break up sitting still.",
    safetyNote: defaultSafety,
    tags: ["ankles", "office", "mobility"]
  },
  {
    slug: "water-break",
    title: "Water walk",
    homeVersion: "Walk to get a glass of water, then take three slow sips.",
    officeVersion: "Walk to refill your bottle or get water.",
    remoteVersion: "Step away from the desk before drinking.",
    why: "A water break adds movement and gives attention a tiny punctuation mark.",
    safetyNote: defaultSafety,
    tags: ["walking", "office", "habit"]
  },
  {
    slug: "chair-stand",
    title: "Three chair stands",
    homeVersion: "Stand up from your chair and sit back down 3-5 times, slowly.",
    officeVersion: "Stand once, stretch, and walk for 30 seconds instead.",
    remoteVersion: "Keep the movement relaxed and use your hands if needed.",
    why: "Chair stands turn a normal desk movement into a small mobility cue.",
    safetyNote: defaultSafety,
    tags: ["legs", "home", "mobility"]
  },
  {
    slug: "jaw-release",
    title: "Jaw and face unclench",
    homeVersion: "Relax your jaw, soften your eyes, and take two slow breaths.",
    officeVersion: "Do it subtly while looking away from the screen.",
    remoteVersion: "Add one shoulder roll if helpful.",
    why: "Many people hold focus as facial tension. Releasing it can make the next minute feel lighter.",
    safetyNote: defaultSafety,
    tags: ["calm", "office", "breathing"]
  }
];
