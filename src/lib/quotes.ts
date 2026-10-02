export interface Quote {
  text: string;
  author: string;
}

/** Motivational quotes shown under the countdown — a random one each page load. */
export const QUOTES: Quote[] = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
  { text: "Great things come from hard work and perseverance. No excuses.", author: "Kobe Bryant" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "The will to win means nothing without the will to prepare.", author: "Juma Ikangaa" },
  { text: "Consistency is what transforms average into excellence.", author: "Unknown" },
  { text: "Every accomplishment starts with the decision to try.", author: "John F. Kennedy" },
  { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
  { text: "Believe you can, and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The best way to predict your future is to create it.", author: "Abraham Lincoln" },
  { text: "Small daily improvements are the key to staggering long-term results.", author: "Robin Sharma" },
  { text: "Dreams don't work unless you do.", author: "John C. Maxwell" },
  { text: "Success doesn't just find you. You have to go out and get it.", author: "Unknown" },
  { text: "Your limitation — it's only your imagination.", author: "Unknown" },
  { text: "Work hard in silence; let success make the noise.", author: "Frank Ocean" },
  { text: "The pain you feel today will be the strength you feel tomorrow.", author: "Unknown" },
  { text: "One day, all your hard work will pay off. Keep going.", author: "Unknown" },
  { text: "Wake up with determination. Go to bed with satisfaction.", author: "George Lorimer" },
  { text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery" },
  { text: "Perseverance is not a long race; it is many short races one after the other.", author: "Walter Elliot" },
  { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" },
  { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
  { text: "The difference between ordinary and extraordinary is that little extra.", author: "Jimmy Johnson" },
  { text: "If it doesn't challenge you, it won't change you.", author: "Fred DeVito" },
  { text: "Stay focused, go after your dreams and keep moving toward your goals.", author: "LL Cool J" },
];

/** Pick a different-feeling random quote each time it's called (per page load). */
export function randomQuote(): Quote {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)] ?? QUOTES[0]!;
}
