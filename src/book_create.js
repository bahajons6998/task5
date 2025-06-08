import { Faker } from '@faker-js/faker';
import { en, de, ja, base } from '@faker-js/faker';

const localeMap = {
  en: [en, base],
  de: [de, en, base],
  jp: [ja, en, base],
};

function getPageSeed(seed, page) {
  return parseInt(seed) + page * 10000;
}

export function book_create({ language = 'en', seed, page, like, review, count = 20, offset = 0 }) {
  const faker = new Faker({ locale: localeMap[language] || [en, base] });
  if (seed) faker.seed(getPageSeed(seed, page));

  return Array.from({ length: count }, (_, index) => ({
    index: offset + index + 1,
    isbn: faker.string.uuid(),
    title: faker.commerce.productName(), 
    authors: [faker.person.fullName()],
    publisher: faker.company.name(),
    cover: faker.image.urlLoremFlickr({ width: 250, height: 300 }),
    likes: faker.number.int({ min: 0, max: like }),
    review: faker.number.int({ min: 0, max: review }),
    reviews: [
      {
        author: faker.person.fullName(),
        text: faker.lorem.sentence(),
      },
      {
        author: faker.person.fullName(),
        text: faker.lorem.sentence(),
      },
      {
        author: faker.person.fullName(),
        text: faker.lorem.sentence(),
      },
    ],
    description: faker.lorem.paragraph({ min: 10, max: 11 }),
  }));
}
