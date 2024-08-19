const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const books = [
  {
    id: 'ck2qgk2l70001hd7ueg8x5z01',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    description:
      "A story about adolescent Holden Caulfield's disillusionment with the adult world.",
    imageUrl: 'https://example.com/images/the_catcher_in_the_rye.jpg',
    totalPages: 234,
    status: 'WANT_TO_READ',
    genre: 'Classics',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-01T00:00:00.000Z'),
    updatedAt: new Date('2023-07-01T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z02',
    title: 'Brave New World',
    author: 'Aldous Huxley',
    description:
      'A dystopian novel set in a totalitarian society controlled by technology and eugenics.',
    imageUrl: 'https://example.com/images/brave_new_world.jpg',
    totalPages: 268,
    status: 'READING',
    genre: 'Science Fiction',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-02T00:00:00.000Z'),
    updatedAt: new Date('2023-07-02T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z03',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    description:
      'An epic fantasy novel about the quest to destroy the One Ring.',
    imageUrl: 'https://example.com/images/the_lord_of_the_rings.jpg',
    totalPages: 1216,
    status: 'FINISHED',
    genre: 'Fantasy',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-03T00:00:00.000Z'),
    updatedAt: new Date('2023-07-03T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z04',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description: 'A fantasy novel that follows the journey of Bilbo Baggins.',
    imageUrl: 'https://example.com/images/the_hobbit.jpg',
    totalPages: 310,
    status: 'WANT_TO_READ',
    genre: 'Fantasy',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-04T00:00:00.000Z'),
    updatedAt: new Date('2023-07-04T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z05',
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    description:
      'A psychological drama about the moral dilemmas of a young man in St. Petersburg.',
    imageUrl: 'https://example.com/images/crime_and_punishment.jpg',
    totalPages: 430,
    status: 'READING',
    genre: 'Psychological Fiction',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-05T00:00:00.000Z'),
    updatedAt: new Date('2023-07-05T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z06',
    title: 'War and Peace',
    author: 'Leo Tolstoy',
    description:
      'An epic novel about the history of the French invasion of Russia.',
    imageUrl: 'https://example.com/images/war_and_peace.jpg',
    totalPages: 1225,
    status: 'WANT_TO_READ',
    genre: 'Historical Fiction',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-06T00:00:00.000Z'),
    updatedAt: new Date('2023-07-06T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z07',
    title: 'Anna Karenina',
    author: 'Leo Tolstoy',
    description:
      'A tragic story of love and adultery set against the backdrop of Russian society.',
    imageUrl: 'https://example.com/images/anna_karenina.jpg',
    totalPages: 864,
    status: 'READING',
    genre: 'Romance',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-07T00:00:00.000Z'),
    updatedAt: new Date('2023-07-07T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z08',
    title: 'The Brothers Karamazov',
    author: 'Fyodor Dostoevsky',
    description:
      'A philosophical novel about the existential struggles of a family in Russia.',
    imageUrl: 'https://example.com/images/the_brothers_karamazov.jpg',
    totalPages: 796,
    status: 'FINISHED',
    genre: 'Philosophical Fiction',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-08T00:00:00.000Z'),
    updatedAt: new Date('2023-07-08T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z09',
    title: 'Great Expectations',
    author: 'Charles Dickens',
    description:
      'The story of a young orphan boy, Pip, and his growth and personal development.',
    imageUrl: 'https://example.com/images/great_expectations.jpg',
    totalPages: 505,
    status: 'WANT_TO_READ',
    genre: 'Classics',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-09T00:00:00.000Z'),
    updatedAt: new Date('2023-07-09T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z10',
    title: 'One Hundred Years of Solitude',
    author: 'Gabriel Garcia Marquez',
    description:
      'A multi-generational story of the Buendia family in the town of Macondo.',
    imageUrl: 'https://example.com/images/one_hundred_years_of_solitude.jpg',
    totalPages: 417,
    status: 'READING',
    genre: 'Magical Realism',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-10T00:00:00.000Z'),
    updatedAt: new Date('2023-07-10T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z11',
    title: 'Wuthering Heights',
    author: 'Emily Bronte',
    description: 'A tale of passion and revenge on the Yorkshire moors.',
    imageUrl: 'https://example.com/images/wuthering_heights.jpg',
    totalPages: 416,
    status: 'FINISHED',
    genre: 'Classics',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-11T00:00:00.000Z'),
    updatedAt: new Date('2023-07-11T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z12',
    title: 'Don Quixote',
    author: 'Miguel de Cervantes',
    description:
      'The story of a man who becomes a knight-errant to revive chivalry.',
    imageUrl: 'https://example.com/images/don_quixote.jpg',
    totalPages: 940,
    status: 'WANT_TO_READ',
    genre: 'Adventure',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-12T00:00:00.000Z'),
    updatedAt: new Date('2023-07-12T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z13',
    title: 'Ulysses',
    author: 'James Joyce',
    description: 'A modernist novel that parallels the events of the Odyssey.',
    imageUrl: 'https://example.com/images/ulysses.jpg',
    totalPages: 730,
    status: 'READING',
    genre: 'Modernist',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-13T00:00:00.000Z'),
    updatedAt: new Date('2023-07-13T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z14',
    title: 'Madame Bovary',
    author: 'Gustave Flaubert',
    description:
      'A novel about the romantic dreams and adultery of Emma Bovary.',
    imageUrl: 'https://example.com/images/madame_bovary.jpg',
    totalPages: 328,
    status: 'FINISHED',
    genre: 'Realist',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-14T00:00:00.000Z'),
    updatedAt: new Date('2023-07-14T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z15',
    title: 'The Divine Comedy',
    author: 'Dante Alighieri',
    description:
      "An epic poem about Dante's journey through Hell, Purgatory, and Paradise.",
    imageUrl: 'https://example.com/images/the_divine_comedy.jpg',
    totalPages: 798,
    status: 'WANT_TO_READ',
    genre: 'Epic Poetry',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-15T00:00:00.000Z'),
    updatedAt: new Date('2023-07-15T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z16',
    title: 'The Iliad',
    author: 'Homer',
    description: 'An ancient Greek epic poem about the Trojan War.',
    imageUrl: 'https://example.com/images/the_iliad.jpg',
    totalPages: 704,
    status: 'READING',
    genre: 'Epic Poetry',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-16T00:00:00.000Z'),
    updatedAt: new Date('2023-07-16T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z17',
    title: 'The Odyssey',
    author: 'Homer',
    description: 'An epic poem that recounts the adventures of Odysseus.',
    imageUrl: 'https://example.com/images/the_odyssey.jpg',
    totalPages: 560,
    status: 'FINISHED',
    genre: 'Epic Poetry',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-17T00:00:00.000Z'),
    updatedAt: new Date('2023-07-17T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z18',
    title: 'The Stranger',
    author: 'Albert Camus',
    description: 'A novel about the absurdity of human existence.',
    imageUrl: 'https://example.com/images/the_stranger.jpg',
    totalPages: 123,
    status: 'WANT_TO_READ',
    genre: 'Philosophical Fiction',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-18T00:00:00.000Z'),
    updatedAt: new Date('2023-07-18T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z19',
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    description: 'A dystopian novel about a future where books are banned.',
    imageUrl: 'https://example.com/images/fahrenheit_451.jpg',
    totalPages: 249,
    status: 'READING',
    genre: 'Science Fiction',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-19T00:00:00.000Z'),
    updatedAt: new Date('2023-07-19T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z20',
    title: 'The Grapes of Wrath',
    author: 'John Steinbeck',
    description:
      'A novel about the plight of migrant workers during the Great Depression.',
    imageUrl: 'https://example.com/images/the_grapes_of_wrath.jpg',
    totalPages: 464,
    status: 'FINISHED',
    genre: 'Historical Fiction',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-20T00:00:00.000Z'),
    updatedAt: new Date('2023-07-20T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z21',
    title: 'Catch-22',
    author: 'Joseph Heller',
    description: 'A satirical novel about the absurdities of war.',
    imageUrl: 'https://example.com/images/catch_22.jpg',
    totalPages: 453,
    status: 'WANT_TO_READ',
    genre: 'Satire',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-21T00:00:00.000Z'),
    updatedAt: new Date('2023-07-21T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z22',
    title: 'The Sound and the Fury',
    author: 'William Faulkner',
    description:
      'A Southern Gothic novel that tells the story of the Compson family.',
    imageUrl: 'https://example.com/images/the_sound_and_the_fury.jpg',
    totalPages: 326,
    status: 'READING',
    genre: 'Southern Gothic',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-22T00:00:00.000Z'),
    updatedAt: new Date('2023-07-22T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z23',
    title: 'Beloved',
    author: 'Toni Morrison',
    description: 'A novel about the haunting legacy of slavery.',
    imageUrl: 'https://example.com/images/beloved.jpg',
    totalPages: 324,
    status: 'FINISHED',
    genre: 'Historical Fiction',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-23T00:00:00.000Z'),
    updatedAt: new Date('2023-07-23T00:00:00.000Z')
  },
  {
    id: 'ck2qgk2l70001hd7ueg8x5z24',
    title: 'Slaughterhouse-Five',
    author: 'Kurt Vonnegut',
    description:
      'A novel about the experiences of a soldier during World War II.',
    imageUrl: 'https://example.com/images/slaughterhouse_five.jpg',
    totalPages: 275,
    status: 'WANT_TO_READ',
    genre: 'Science Fiction',
    userId: 'clzv9k5si00004vrtf971kbiy',
    createdAt: new Date('2023-07-24T00:00:00.000Z'),
    updatedAt: new Date('2023-07-24T00:00:00.000Z')
  }
]

async function main() {
  for (const book of books) {
    await prisma.book.create({
      data: book
    })
  }
  console.log('Books inserted successfully!')
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
