/** Public-domain titles with stable Gutenberg cache URLs. Used when Gutendex is blocked. */
export interface CatalogHit {
  id: number;
  title: string;
  authors: string;
  textUrl: string;
  license: string;
}

export const gutenbergCatalog: CatalogHit[] = [
  {
    id: 11,
    title: "Alice's Adventures in Wonderland",
    authors: "Lewis Carroll",
    textUrl: "https://www.gutenberg.org/cache/epub/11/pg11.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 84,
    title: "Frankenstein; Or, The Modern Prometheus",
    authors: "Mary Wollstonecraft Shelley",
    textUrl: "https://www.gutenberg.org/cache/epub/84/pg84.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 1342,
    title: "Pride and Prejudice",
    authors: "Jane Austen",
    textUrl: "https://www.gutenberg.org/cache/epub/1342/pg1342.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 1661,
    title: "The Adventures of Sherlock Holmes",
    authors: "Arthur Conan Doyle",
    textUrl: "https://www.gutenberg.org/cache/epub/1661/pg1661.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 98,
    title: "A Tale of Two Cities",
    authors: "Charles Dickens",
    textUrl: "https://www.gutenberg.org/cache/epub/98/pg98.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 2701,
    title: "Moby Dick; Or, The Whale",
    authors: "Herman Melville",
    textUrl: "https://www.gutenberg.org/cache/epub/2701/pg2701.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 174,
    title: "The Picture of Dorian Gray",
    authors: "Oscar Wilde",
    textUrl: "https://www.gutenberg.org/cache/epub/174/pg174.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 345,
    title: "Dracula",
    authors: "Bram Stoker",
    textUrl: "https://www.gutenberg.org/cache/epub/345/pg345.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 43,
    title: "The Strange Case of Dr. Jekyll and Mr. Hyde",
    authors: "Robert Louis Stevenson",
    textUrl: "https://www.gutenberg.org/cache/epub/43/pg43.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 76,
    title: "Adventures of Huckleberry Finn",
    authors: "Mark Twain",
    textUrl: "https://www.gutenberg.org/cache/epub/76/pg76.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 1232,
    title: "The Prince",
    authors: "Niccolò Machiavelli",
    textUrl: "https://www.gutenberg.org/cache/epub/1232/pg1232.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 6130,
    title: "The Iliad",
    authors: "Homer",
    textUrl: "https://www.gutenberg.org/cache/epub/6130/pg6130.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 1998,
    title: "Thus Spake Zarathustra",
    authors: "Friedrich Nietzsche",
    textUrl: "https://www.gutenberg.org/cache/epub/1998/pg1998.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 30254,
    title: "The Problems of Philosophy",
    authors: "Bertrand Russell",
    textUrl: "https://www.gutenberg.org/cache/epub/30254/pg30254.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 1228,
    title: "On the Origin of Species By Means of Natural Selection",
    authors: "Charles Darwin",
    textUrl: "https://www.gutenberg.org/cache/epub/1228/pg1228.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 55,
    title: "The Wonderful Wizard of Oz",
    authors: "L. Frank Baum",
    textUrl: "https://www.gutenberg.org/cache/epub/55/pg55.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 1400,
    title: "Great Expectations",
    authors: "Charles Dickens",
    textUrl: "https://www.gutenberg.org/cache/epub/1400/pg1400.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 1080,
    title: "A Modest Proposal",
    authors: "Jonathan Swift",
    textUrl: "https://www.gutenberg.org/cache/epub/1080/pg1080.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 25344,
    title: "The Scarlet Letter",
    authors: "Nathaniel Hawthorne",
    textUrl: "https://www.gutenberg.org/cache/epub/25344/pg25344.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 5200,
    title: "Metamorphosis",
    authors: "Franz Kafka",
    textUrl: "https://www.gutenberg.org/cache/epub/5200/pg5200.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 2591,
    title: "Grimms' Fairy Tales",
    authors: "Jacob Grimm and Wilhelm Grimm",
    textUrl: "https://www.gutenberg.org/cache/epub/2591/pg2591.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 16328,
    title: "Beowulf",
    authors: "Anonymous",
    textUrl: "https://www.gutenberg.org/cache/epub/16328/pg16328.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 2500,
    title: "Siddhartha",
    authors: "Hermann Hesse",
    textUrl: "https://www.gutenberg.org/cache/epub/2500/pg2500.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 4363,
    title: "Beyond Good and Evil",
    authors: "Friedrich Nietzsche",
    textUrl: "https://www.gutenberg.org/cache/epub/4363/pg4363.txt",
    license: "Public domain (Project Gutenberg)"
  },
  {
    id: 1497,
    title: "The Republic",
    authors: "Plato",
    textUrl: "https://www.gutenberg.org/cache/epub/1497/pg1497.txt",
    license: "Public domain (Project Gutenberg)"
  }
];

export function searchCatalog(query: string): CatalogHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return gutenbergCatalog.slice(0, 8);
  return gutenbergCatalog.filter(
    (hit) =>
      hit.title.toLowerCase().includes(q) ||
      hit.authors.toLowerCase().includes(q) ||
      String(hit.id) === q
  );
}
