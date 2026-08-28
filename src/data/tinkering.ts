export interface TinkeringProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  type: 'terminal' | 'game' | 'math' | 'experiment';
}

export const tinkeringProjects: TinkeringProject[] = [
  {
    id: "8bit-os",
    title: "8Bit OS",
    description: "A retro-style 8-bit operating system interface running entirely in the browser.",
    tech: ["CSS", "Retro UI"],
    link: "https://8bit-os-portfolio.vercel.app/",
    type: "terminal"
  },
  {
    id: "ascii-shooter",
    title: "ASCII Shooter",
    description: "A terminal-style ASCII-based shooter game built for the web.",
    tech: ["ASCII", "Game"],
    link: "https://ascii-shooter.vercel.app/",
    type: "game"
  },
  {
    id: "math-art",
    title: "Generative Math Art",
    description: "Mathematical / generative art experiments driven by code.",
    tech: ["Canvas", "Math"],
    link: "https://art.fazleyrabbi.xyz/",
    type: "math"
  },
  {
    id: "lol-dir",
    title: "lol-dir",
    description: "A playful, experimental directory indexer.",
    tech: ["Experimental"],
    link: "https://lol.fazleyrabbi.xyz/",
    type: "experiment"
  }
];
