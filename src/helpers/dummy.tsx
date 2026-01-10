"use client";

import Badge from "@/components/shared/Badge";
import Link from "next/link";

/* =======================
   Constants
======================= */
const CONSONANTS = [
  "b",
  "c",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "r",
  "s",
  "t",
  "v",
  "w",
  "z",
  "br",
  "cr",
  "dr",
  "fr",
  "gr",
  "pr",
  "tr",
  "ch",
  "sh",
  "th",
  "st",
  "cl",
  "pl",
  "sl",
];

const VOWELS = ["a", "e", "i", "o", "u", "ae", "ai", "ea", "io", "ou"];

const SUFFIXES = [
  "Inc",
  "Ltd",
  "LLC",
  "Group",
  "Corp",
  "Technologies",
  "Solutions",
  "Industries",
  "Ventures",
  "Systems",
];

const SYMBOL_COLORS = [
  "bg-blue-500",
  "bg-sky-500",
  "bg-cyan-500",
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-green-500",
  "bg-teal-500",
  "bg-lime-500",
  "bg-amber-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-rose-500",
  "bg-red-500",
  "bg-pink-500",
  "bg-fuchsia-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-slate-500",
  "bg-zinc-500",
];

const TIMEZONE_COLORS = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-violet-500",
  "bg-cyan-500",
  "bg-lime-500",
  "bg-sky-500",
  "bg-fuchsia-500",
  "bg-orange-500",
];

const TIMEZONES = ["EST", "CST", "MST", "PST"];
const EMAIL_DOMAINS = ["example.com", "mail.com", "test.com", "demo.com"];

/* =======================
   Helpers
======================= */
const random = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

const generateWord = (minSyllables = 2, maxSyllables = 3) => {
  const syllables =
    Math.floor(Math.random() * (maxSyllables - minSyllables + 1)) +
    minSyllables;
  let word = "";
  for (let i = 0; i < syllables; i++) {
    word += random(CONSONANTS) + random(VOWELS);
  }
  const length = Math.floor(Math.random() * 4) + 4; // 4–7 chars
  return capitalize(word.slice(0, length));
};

/* =======================
   Hook
======================= */
export default function useDummy() {
  // Random company name
  const company = () => {
    const isTwoWords = Math.random() > 0.6;
    const isStartupStyle = Math.random() > 0.7;

    const name = isTwoWords
      ? `${generateWord()} ${generateWord()}`
      : generateWord();

    return isStartupStyle ? name : `${name} ${random(SUFFIXES)}`;
  };

  // Company symbol badge
  const symbol = (name: string) => {
    const shortName = name.split(" ")[0].toUpperCase();
    const bgColor =
      SYMBOL_COLORS[
        shortName.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) %
          SYMBOL_COLORS.length
      ];

    return (
      <Badge>
        <span
          className={`${bgColor} text-white text-xs px-2 py-0.5 rounded-2xl`}
        >
          {shortName}
        </span>
      </Badge>
    );
  };

  // Timezone badge
  const timeZone = () => {
    const index = Math.floor(Math.random() * TIMEZONES.length);
    const priority = index + 1;
    const tz = `${priority}-${TIMEZONES[index]}`;

    const bgColor =
      TIMEZONE_COLORS[
        tz.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) %
          TIMEZONE_COLORS.length
      ];

    return (
      <Badge>
        <span
          className={`${bgColor} text-white text-xs px-2 py-0.5 rounded-2xl`}
        >
          {tz}
        </span>
      </Badge>
    );
  };

  // Campaign badge
  const campaign = (name?: string) => {
    const types = ["SVG", "BENTON", "95RM", "SIDAGO"];

    // Assign a specific color per campaign type
    const colors: Record<string, string> = {
      SVG: "bg-blue-500",
      BENTON: "bg-rose-500",
      "95RM": "bg-amber-500",
      SIDAGO: "bg-green-500",
    };

    let selected: string;
    let bgColor: string;

    if (name && types.includes(name.toUpperCase())) {
      selected = name.toUpperCase();
      bgColor = colors[selected];
    } else {
      selected = random(types);
      bgColor = colors[selected];
    }

    return (
      <Badge>
        <span
          className={`${bgColor} text-white text-xs px-2 py-0.5 rounded-2xl`}
        >
          {selected}
        </span>
      </Badge>
    );
  };

  // Lead Type badge
  const leadType = (name?: string) => {
    const types = ["GENERAL", "HOT", "IGNORE", "DNC", "ON HOLD", "VOID"];
    const colors = [
      "bg-amber-500",
      "bg-red-500",
      "bg-blue-200",
      "bg-blue-400",
      "bg-violet-400",
      "bg-red-900",
    ];

    let type: string;
    let bgColor: string;

    if (name && types.includes(name.toUpperCase())) {
      // if name is valid, use it
      const index = types.indexOf(name.toUpperCase());
      type = types[index];
      bgColor = colors[index];
    } else {
      // else pick random
      const index = Math.floor(Math.random() * types.length);
      type = types[index];
      bgColor = colors[index];
    }

    return (
      <Badge>
        <span
          className={`${bgColor} text-white text-xs px-2 py-0.5 rounded-2xl`}
        >
          {type}
        </span>
      </Badge>
    );
  };

  // Random date, optionally with time
  const randomDate = (format?: "hm", start?: Date, end?: Date) => {
    const startDate = start || new Date(2020, 0, 1); // Jan 1, 2020
    const endDate = end || new Date(2030, 11, 31); // Dec 31, 2030

    const date = new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime())
    );

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    if (format === "hm") {
      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      if (hours === 0) hours = 12; // midnight or noon
      const hoursStr = String(hours).padStart(2, "0");

      return `${year}-${month}-${day} ${hoursStr}:${minutes}:${seconds} ${ampm}`;
    }

    return `${year}-${month}-${day}`;
  };

  // Random agent badge
  const agent = (name?: string) => {
    const agents = [
      "TOM",
      "RYAN",
      "LISA",
      "JAMES",
      "SOPHIA",
      "DAVID",
      "EMMA",
      "MICHAEL",
      "OLIVIA",
      "CHRIS",
      "AVA",
    ];

    // Assign a specific color per agent
    const colors: Record<string, string> = {
      TOM: "bg-blue-500",
      RYAN: "bg-rose-500",
      LISA: "bg-amber-500",
      JAMES: "bg-green-500",
      SOPHIA: "bg-violet-500",
      DAVID: "bg-cyan-500",
      EMMA: "bg-lime-500",
      MICHAEL: "bg-orange-500",
      OLIVIA: "bg-fuchsia-500",
      CHRIS: "bg-pink-500",
      AVA: "bg-indigo-500",
    };

    let selectedAgent: string;
    let bgColor: string;

    if (name && agents.includes(name.toUpperCase())) {
      selectedAgent = name.toUpperCase();
      bgColor = colors[selectedAgent];
    } else {
      selectedAgent = random(agents);
      bgColor = colors[selectedAgent];
    }

    return (
      <Badge>
        <span
          className={`${bgColor} text-white text-xs px-2 py-0.5 rounded-2xl`}
        >
          {selectedAgent}
        </span>
      </Badge>
    );
  };

  // Lead outcome badge
  const resultUpdate = () => {
    const outcomes = [
      "Contract Closed",
      "Force General",
      "No Answer",
      "Not Interested",
      "Interested",
    ];

    // Assign a deterministic color per outcome
    const outcomeColors: Record<string, string> = {
      "Contract Closed": "bg-green-500",
      "Force General": "bg-yellow-500",
      "No Answer": "bg-gray-500",
      "Not Interested": "bg-red-500",
      Interested: "bg-green-500",
    };

    const selected = random(outcomes); // pick random outcome
    const bgColor = outcomeColors[selected];

    return (
      <Badge>
        <span
          className={`${bgColor} text-white text-xs px-2 py-0.5 rounded-2xl`}
        >
          {selected}
        </span>
      </Badge>
    );
  };

  // Random lead ID generator (letters only)
  const leadID = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const randomChars = (length: number) =>
      Array.from({ length }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
      ).join("");

    return `${randomChars(4)}-${randomChars(8)}`;
  };

  // Random full name
  const name = () => `${generateWord()} ${generateWord()}`;

  // Random email (optionally based on a name)
  const email = (full?: string) => {
    const fullName = full || name();
    const [first, last] = fullName.split(" ");
    const number = Math.random() > 0.7 ? Math.floor(Math.random() * 100) : "";
    const emailAddress = `${first.toLowerCase()}.${last.toLowerCase()}${number}@${random(
      EMAIL_DOMAINS
    )}`;

    return (
      <Link href={`mailto:${emailAddress}`} className="text-blue-500 underline">
        {emailAddress}
      </Link>
    );
  };
  // Random US phone number
  const phone = () => {
    const area = Math.floor(Math.random() * 900 + 100);
    const central = Math.floor(Math.random() * 900 + 100);
    const line = Math.floor(Math.random() * 9000 + 1000);
    return `+1 (${area}) ${central}-${line}`;
  };

  // Priority badge
  const priority = (name?: string) => {
    const priorities = ["1st", "2nd", "3rd", "4th", "5th"];
    const colors = [
      "bg-blue-500",
      "bg-rose-500",
      "bg-amber-500",
      "bg-green-500",
      "bg-violet-500",
    ];

    let selected: string;
    let bgColor: string;

    if (name && priorities.includes(name)) {
      const index = priorities.indexOf(name);
      selected = priorities[index];
      bgColor = colors[index];
    } else {
      const index = Math.floor(Math.random() * priorities.length);
      selected = priorities[index];
      bgColor = colors[index];
    }

    return (
      <Badge>
        <span
          className={`${bgColor} text-white text-xs px-2 py-0.5 rounded-2xl`}
        >
          {selected}
        </span>
      </Badge>
    );
  };

  // Contact Type badge
  const contactType = (name?: string) => {
    const types = ["Prospecting", "Validated"];
    const colors = ["bg-amber-500", "bg-green-500"];

    let selected: string;
    let bgColor: string;

    if (name && types.includes(name)) {
      const index = types.indexOf(name);
      selected = types[index];
      bgColor = colors[index];
    } else {
      const index = Math.floor(Math.random() * types.length);
      selected = types[index];
      bgColor = colors[index];
    }

    return (
      <Badge>
        <span
          className={`${bgColor} text-white text-xs px-2 py-0.5 rounded-2xl`}
        >
          {selected}
        </span>
      </Badge>
    );
  };

  // To be called
  const tobeCalled = () => {
    return (
      <div
        className="inline-block bg-[#e9eef9] rounded px-2 py-0.5 text-sm"
        style={{ minWidth: 0 }}
      >
        {generateWord()}
      </div>
    );
  };

  return {
    company,
    symbol,
    timeZone,
    campaign,
    leadType,
    agent,
    resultUpdate,
    leadID,
    randomDate,
    name,
    email,
    phone,
    priority,
    contactType,
    tobeCalled,
  };
}
