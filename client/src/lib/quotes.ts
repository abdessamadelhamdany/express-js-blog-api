import { randomNumber } from './helpers';

const quotes: { quote: string; author: string }[] = [
  { quote: 'You fail only if you stop writing.', author: 'Ray Bradbury' },
  {
    quote: 'If my doctor told me I had only six minutes to live, I wouldn’t brood. I’d type a little faster.',
    author: 'Isaac Asimov',
  },
  {
    quote:
      'I’ve written because it fulfilled me. Maybe it paid off the mortgage on the house and got the kids through college, but those things were on the side — I did it for the buzz. I did it for the pure joy of the thing. And if you can do it for joy, you can do it forever.',
    author: 'Stephen King',
  },
  {
    quote: 'If there’s a book that you want to read, but it hasn’t been written yet, then you must write it.',
    author: 'Toni Morrison',
  },
  { quote: 'We write to taste life twice, in the moment and in retrospect.', author: 'Anaïs Nin' },
  {
    quote:
      'Don’t bend; don’t water it down; (and) don’t try to make it logical; don’t edit your own soul according to the fashion. Rather, follow your most intense obsessions mercilessly.',
    author: 'Franz Kafka',
  },
  {
    quote:
      'Just write every day of your life. Read intensely. Then see what happens. Most of my friends who are put on that diet have very pleasant careers.',
    author: 'Ray Bradbury',
  },
  {
    quote:
      'When your story is ready for rewrite, cut it to the bone. Get rid of every ounce of excess fat. This is going to hurt; revising a story down to the bare essentials is always a little like murdering children, but it must be done.',
    author: 'Stephen King',
  },
  {
    quote:
      'And by the way, everything in life is writable about if you have the outgoing guts to do it, and the imagination to improvise. The worst enemy to creativity is self-doubt.',
    author: 'Sylvia Plath',
  },
  {
    quote: 'How vain it is to sit down to write when you have not stood up to live.',
    author: 'Henry David Thoreau',
  },
  { quote: 'What is written without effort is in general read without pleasure.', author: 'Samuel Johnson' },
  {
    quote:
      '90 percent perfect and shared with the world always changes more lives than 100 percent perfect and stuck in your head.',
    author: 'Jon Acuff',
  },
  {
    quote: 'You can’t fail if you don’t quit. You can’t succeed if you don’t start.',
    author: 'Michael Hyatt',
  },
  {
    quote:
      'Write something that’s worth fighting over. Because that’s how you change things. That’s how you create art.',
    author: 'Jeff Goins',
  },
  {
    quote: 'Inspiration may sometimes fail to show up for work in the morning, but determination never does.',
    author: 'K.M. Weiland',
  },
  {
    quote:
      'Exercise the writing muscle every day, even if it is only a letter, notes, a title list, a character sketch, a journal entry. Writers are like dancers, like athletes. Without that exercise, the muscles seize up.',
    author: 'Jane Yolen',
  },
  {
    quote:
      'Write what disturbs you, what you fear, what you have not been willing to speak about. Be willing to be split open.',
    author: 'Natalie Goldberg',
  },
  { quote: 'Write what should not be forgotten.', author: 'Isabel Allende' },
  { quote: 'Words are a lens to focus one’s mind.', author: 'Ayn Rand' },
  { quote: 'Fill your paper with the breathings of your heart.', author: 'William Wadsworth' },
  {
    quote: 'You may not always write well, but you can edit a bad page. You can’t edit a blank page.',
    author: 'Jodi Picoult',
  },
  {
    quote:
      'It took me fifteen years to discover that I had no talent for writing, but I couldn’t give it up because by that time I was too famous.',
    author: 'Robert Benchley',
  },
  { quote: 'The most beautiful things are those that madness prompts and reason writes.', author: 'Andre Gide' },
  { quote: 'Opportunities don’t happen. You create them.', author: 'Chris Grosser' },
  {
    quote: 'Either write something worth reading or do something worth writing.',
    author: 'Benjamin Franklin',
  },
  { quote: 'Done is better than perfect.', author: 'Sheryl Sandberg' },
  {
    quote: 'There’s no such thing as writer’s block. That was invented by people in California who couldn’t write.',
    author: 'Terry Pratchett',
  },
  {
    quote:
      'You don’t start out writing good stuff. You start out writing crap and thinking it’s good stuff, and then gradually you get better at it. That’s why I say one of the most valuable traits is persistence.',
    author: 'Octavia E. Butler',
  },
  { quote: 'There is no greater agony than bearing an untold story inside you.', author: 'Maya Angelou' },
  {
    quote:
      'Every secret of a writer’s soul, every experience of his life, every quality of his mind, is written large in his works.',
    author: 'Virginia Woolf',
  },
  {
    quote: 'Don’t tell me the moon is shining; show me the glint of light on broken glass.',
    author: 'Anton Chekhov',
  },
  {
    quote: 'No tears in the writer, no tears in the reader. No surprise in the writer, no surprise in the reader.',
    author: 'Robert Frost',
  },
  { quote: 'The first draft is just you telling yourself the story.', author: 'Terry Pratchett' },
  {
    quote:
      'I would write a book, or a short story, at least three times — once to understand it, the second time to improve the prose, and a third to compel it to say what it still must say. Somewhere I put it this way: first drafts are for learning what one’s fiction wants him to say. Revision works with that knowledge to enlarge and enhance an idea, to reform it. Revision is one of the exquisite pleasures of writing.',
    author: 'Bernard Malamud',
  },
  {
    quote:
      'The difference between the almost right word and the right word is the difference between the lightning bug and the lightning.',
    author: 'Mark Twain',
  },
  {
    quote: 'I love deadlines. I like the whooshing sound they make as they fly by.',
    author: 'Douglas Adams',
  },
  {
    quote: 'The main thing I try to do is write as clearly as I can. I rewrite a good deal to make it clear.',
    author: 'E.B. White',
  },
  {
    quote:
      'Words can be like X-rays if you use them properly — they’ll go through anything. You read and you’re pierced.',
    author: 'Aldous Huxley',
  },
  {
    quote:
      'Here is a lesson in creative writing. First rule: Do not use semicolons. (…) All they do is show you’ve been to college.',
    author: 'Kurt Vonnegut Jr.',
  },
  { quote: 'One day I will find the right words, and they will be simple.', author: 'Jack Kerouac' },
  {
    quote:
      'When I sit down to write a book, I do not say to myself, ‘I am going to produce a work of art.’ I write it because there is some lie that I want to expose, some fact to which I want to draw attention, and my initial concern is to get a hearing.',
    author: 'George Orwell',
  },
  { quote: 'Anybody can make history. Only a great man can write it.', author: 'Oscar Wilde' },
  { quote: 'I try to leave out the parts that people skip.', author: 'Elmore Leonard' },
  {
    quote: 'I can shake off everything as I write; my sorrows disappear, my courage is reborn.',
    author: 'Anne Frank',
  },
  {
    quote:
      'A person is a fool to become a writer. His only compensation is absolute freedom. He has no master except his own soul, and that, I am sure, is why he does it.',
    author: 'Roald Dahl',
  },
  {
    quote: 'There are three rules for writing a novel. Unfortunately, no one knows what they are.',
    author: 'Somerset Maugham',
  },
  { quote: 'I write to discover what I know.', author: 'Flannery O’Connor' },
  {
    quote:
      'You have to write the book that wants to be written. And if the book will be too difficult for grown-ups, then you write it for children.',
    author: 'Madeleine L’Engle',
  },
  {
    quote:
      'Writing is easy: All you do is sit staring at a blank piece of paper until drops of blood form on your forehead.',
    author: 'Gene Fowler',
  },
  {
    quote: 'You never have to change anything you got up in the middle of the night to write.',
    author: 'Saul Bellow',
  },
  {
    quote: 'Write. Rewrite. When not writing or rewriting, read. I know of no shortcuts.',
    author: 'Larry L. King',
  },
  {
    quote:
      'I am irritated by my own writing. I am like a violinist whose ear is true, but whose fingers refuse to reproduce precisely the sound he hears within.',
    author: 'Gustave Flaubert',
  },
  { quote: 'To produce a mighty book, you must choose a mighty theme.', author: 'Herman Melville' },
  { quote: 'Good writing is rewriting.', author: 'Truman Capote' },
  { quote: 'Don’t take anyone’s writing advice too seriously.', author: 'Lev Grossman' },
  {
    quote:
      'Cheat your landlord if you can and must, but do not try to shortchange the Muse. It cannot be done. You can’t fake quality any more than you can fake a good meal.',
    author: 'William S. Burroughs',
  },
  {
    quote: 'The most valuable of all talents is that of never using two words when one will do.',
    author: 'Thomas Jefferson',
  },
  {
    quote:
      'The greatest part of a writer’s time is spent in reading, in order to write; a man will turn over half a library to make one book.',
    author: 'Samuel Johnson',
  },
  {
    quote:
      'Any man who keeps working is not a failure. He may not be a great writer, but if he applies the old-fashioned virtues of hard, constant labor, he’ll eventually make some kind of career for himself as writer.',
    author: 'Ray Bradbury',
  },
  {
    quote:
      'Do not hoard what seems good for a later place in the book, or for another book; give it, give it all, give it now.',
    author: 'Annie Dillard',
  },
  { quote: 'You can make anything by writing.', author: 'C.S. Lewis' },
  {
    quote: 'You don’t write because you want to say something, you write because you have something to say.',
    author: 'F. Scott Fitzgerald',
  },
  { quote: 'Some editors are failed writers, but so are most writers.', author: 'T.S. Eliot' },
  {
    quote:
      'I wake up in the morning and my mind starts making sentences, and I have to get rid of them fast — talk them or write them down.',
    author: 'Ernest Hemingway',
  },
  {
    quote:
      'Empty your knapsack of all adjectives, adverbs and clauses that slow your stride and weaken your pace. Travel light.',
    author: 'Bill Moyers',
  },
  { quote: 'If I waited for perfection, I would never write a word.', author: 'Margaret Atwood' },
  {
    quote:
      'Everybody walks past a thousand story ideas every day. The good writers are the ones who see five or six of them. Most people don’t see any.',
    author: 'Orson Scott Card',
  },
  {
    quote: 'Start writing, no matter what. The water does not flow until the faucet is turned on.',
    author: 'Louis L’Amour',
  },
  {
    quote:
      'A writer needs three things, experience, observation, and imagination, any two of which, at times any one of which, can supply the lack of the others.',
    author: 'William Faulkner',
  },
  { quote: 'A professional writer is an amateur who didn’t quit.', author: 'Richard Bach' },
  {
    quote: 'All you have to do is write one true sentence. Write the truest sentence that you know.',
    author: 'Ernest Hemingway',
  },
  {
    quote:
      'You have to resign yourself to wasting lots of trees before you write anything really good. That’s just how it is. It’s like learning an instrument. You’ve got to be prepared for hitting wrong notes occasionally, or quite a lot. That’s just part of the learning process.',
    author: 'J.K. Rowling',
  },
  { quote: 'Failures are finger posts on the road to achievement.', author: 'C. S. Lewis' },
  {
    quote: 'A writer is someone for whom writing is more difficult than it is for other people.',
    author: 'Thomas Mann',
  },
  {
    quote:
      '(…) write your story as it needs to be written. Write it ­honestly, and tell it as best you can. I’m not sure that there are any other rules. Not ones that matter.',
    author: 'Neil Gaiman',
  },
  {
    quote:
      'Don’t try to figure out what other people want to hear from you; figure out what you have to say. It’s the one and only thing you have to offer.',
    author: 'Barbara Kingsolver',
  },
  {
    quote:
      'When you are pouring yourself into your work and bringing your unique perspective and skills to the table, then you are adding value that only you are capable of contributing.',
    author: 'Todd Henry',
  },
  {
    quote:
      'Writing a novel is like driving a car at night. You can only see as far as your headlights, but you can make the whole trip that way.',
    author: 'E. L. Doctorow',
  },
  { quote: 'We were born to be brave.', author: 'Bob Goff' },
  {
    quote: 'Almost all good writing begins with terrible first efforts. You need to start somewhere.',
    author: 'Anne Lamott',
  },
  {
    quote: 'I could write an entertaining novel about rejection slips, but I fear it would be overly long.',
    author: 'Louise Brown',
  },
  {
    quote: 'Ideas are like rabbits. You get a couple and learn how to handle them, and pretty soon you have a dozen.',
    author: 'John Steinbeck',
  },
  {
    quote: 'I went for years not finishing anything. Because, of course, when you finish something you can be judged.',
    author: 'Erica Jong',
  },
  { quote: 'If the book is true, it will find an audience that is meant to read it.', author: 'Wally Lamb' },
  {
    quote:
      'People say, ‘What advice do you have for people who want to be writers?’ I say, they don’t really need advice, they know they want to be writers, and they’re gonna do it. Those people who know that they really want to do this and are cut out for it, they know it.',
    author: 'R.L. Stine',
  },
  {
    quote:
      'Most writers draw a blank when they first start with writing prompts. Keep pushing through, because something thrilling will start to happen.',
    author: 'Mel Wicks',
  },
  {
    quote: 'It’s none of their business that you have to learn to write. Let them think you were born that way.',
    author: 'Ernest Hemingway',
  },
  {
    quote: 'I do not over-intellectualise the production process. I try to keep it simple: Tell the d*mned story.',
    author: 'Tom Clancy',
  },
  {
    quote:
      'Being a writer is not just about typing. It’s also about surviving the rollercoaster of the creative journey.',
    author: 'Joanna Penn',
  },
  {
    quote:
      'Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing or learning to do.',
    author: 'Pele',
  },
  { quote: 'Don’t count the days, make the days count.', author: 'Muhammad Ali' },
  {
    quote: 'Failure will never overtake me if my determination to succeed is strong enough.',
    author: 'Og Mandino',
  },
  { quote: 'Hard work beats talent when talent doesn’t work hard.', author: 'Tim Notke' },
  {
    quote: 'Live as if you were to die tomorrow. Learn as if you were to live forever.',
    author: 'Mahatma Gandhi',
  },
  { quote: 'Too many of us are not living our dreams because we are living our fears.', author: 'Les Brown' },
  {
    quote:
      'I do not think that there is any other quality so essential to success of any kind as the quality of perseverance. It overcomes almost everything, even nature.',
    author: 'John D. Rockefeller',
  },
  {
    quote: 'A goal is not always meant to be reached; it often serves simply as something to aim at.',
    author: 'Bruce Lee',
  },
  { quote: 'I’m not a product of my circumstances. I am a product of my decisions.', author: 'Stephen Covey' },
  {
    quote: 'There is only one thing that makes a dream impossible to achieve, the fear of failure.',
    author: 'Paulo Coelho',
  },
  {
    quote: 'The whole secret of a successful life is to find out what is one’s destiny to do, and then do it.',
    author: 'Henry Ford',
  },
  {
    quote: 'If you are not willing to risk the usual you will have to settle for the ordinary.',
    author: 'Jim Rohn',
  },
  {
    quote: 'Perfection is not attainable, but if we chase perfection we can catch excellence.',
    author: 'Vince Lombardi',
  },
  { quote: 'Failure is another stepping stone to greatness.', author: 'Oprah Winfrey' },
  { quote: 'The best way to gain self-confidence is to do what you are afraid to do.', author: 'Swati Sharma' },
  {
    quote:
      'The only way to do great work is to love what you do. If you haven’t found it yet, keep looking. Don’t settle.',
    author: 'Steve Jobs',
  },
  {
    quote:
      'Unsuccessful people make their decisions based on their current situations. Successful people make their decisions based on where they want to be.',
    author: 'Benjamin Hardy',
  },
  {
    quote: 'Success is going from failure to failure without losing your enthusiasm.',
    author: 'Winston Churchill',
  },
  {
    quote: 'You were born to win, but to be a winner, you must plan to win, prepare to win, and expect to win.',
    author: 'Zig Ziglar',
  },
  { quote: 'A person who never made a mistake never tried anything new.', author: 'Albert Einstein' },
  {
    quote: 'Learn from the mistakes of others. You can’t live long enough to make them all yourself.',
    author: 'Eleanor Roosevelt',
  },
  { quote: 'Do what you can with all you have, wherever you are.', author: 'Theodore Roosevelt' },
  { quote: 'All our dreams can come true, if we have the courage to pursue them.', author: 'Walt Disney' },
  { quote: 'Our greatest glory is not in never falling, but in rising every time we fall.', author: 'Confucius' },
  {
    quote:
      'Don’t say you don’t have enough time. You have exactly the same number of hours per day that were given to Helen Keller, Pasteur, Michelangelo, Mother Teresa, Leonardo Da Vinci, Thomas Jefferson, and Albert Einstein.',
    author: 'H. Jackson Brown Jr.',
  },
  {
    quote: 'What you lack in talent can be made up with desire, hustle and giving 110% all the time.',
    author: 'Don Zimmer',
  },
  { quote: 'Do the best you can. No one can do more than that.', author: 'John Wooden' },
  { quote: 'What we fear of doing most is usually what we most need to do.', author: 'Ralph Waldo Emerson' },
  {
    quote:
      'If you believe it’ll work out, you’ll see opportunities. If you don’t believe it’ll work out, you’ll see obstacles.',
    author: 'Wayne Dyer',
  },
  {
    quote: 'Don’t worry when you are not recognized, but strive to be worthy of recognition.',
    author: 'Abraham Lincoln',
  },
  { quote: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', author: 'Aristotle' },
  {
    quote: 'One important key to success is self-confidence. An important key to self-confidence is preparation.',
    author: 'Arthur Ashe',
  },
  {
    quote: 'Success is a lousy teacher. It seduces smart people into thinking they can’t lose.',
    author: 'Bill Gates',
  },
  {
    quote:
      'Move out of your comfort zone. You can only grow if you are willing to feel awkward and uncomfortable when you try something new.',
    author: 'Brian Tracy',
  },
  { quote: 'Just one small positive thought in the morning can change your whole day.', author: 'Dalai Lama' },
  {
    quote:
      'Develop success from failures. Discouragement and failure are two of the surest stepping stones to success.',
    author: 'Dale Carnegie',
  },
  { quote: 'You must expect great things of yourself before you can do them.', author: 'Michael Jordan' },
  { quote: 'If you cannot do great things, do small things in a great way.', author: 'Napoleon Hill' },
  { quote: 'Everything you’ve ever wanted is on the other side of fear.', author: 'George Addair' },
  { quote: 'The path to success is to take massive, determined action.', author: 'Tony Robbins' },
  { quote: 'Tough times never last, but tough people do.', author: 'Robert Schuller' },
  {
    quote: 'Only put off until tomorrow what you are willing to die having left undone.',
    author: 'Pablo Picasso',
  },
  { quote: 'Don’t watch the clock; do what it does. Keep going.', author: 'Sam Levenson' },
  {
    quote:
      'Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.',
    author: 'Thomas Edison',
  },
  {
    quote: 'Give your dreams all you’ve got and you’ll be amazed at the energy that comes out of you.',
    author: 'William James',
  },
  { quote: 'It’s hard to beat a person who never gives up.', author: 'Babe Ruth' },
  {
    quote:
      'Failure after long perseverance is much grander than never to have a striving good enough to be called a failure.',
    author: 'George Eliot',
  },
  { quote: 'It always seems impossible until it’s done.', author: 'Nelson Mandela' },
  { quote: 'I have not failed. I’ve just found 10,000 ways that won’t work.', author: 'Thomas A. Edison' },
];

export function randomQuote() {
  const idx = randomNumber(0, quotes.length);
  const quote = quotes[idx];
  return `${quote.quote} by ${quote.author}`;
}
