import { test, expect } from '../../fixture/secret.fixture';
import { faker } from '@faker-js/faker';

const JSON_PLACEHOLDER_BASE_URL = 'https://jsonplaceholder.typicode.com/';

interface TodoData {
  userId: number;
  title: string;
  body: string;
}

const todoData: TodoData = {
  userId: faker.number.int({ min: 1, max: 1000 }),
  title: faker.lorem.sentence({ min: 5, max: 10 }),
  body: faker.lorem.paragraphs({ min: 1, max: 3 }),
}

test(`👉🏽 POST request - JsonPlaceholder URL`, async ({ request, encryptedSecret, testTime }) => {
  const response = await request.post(`${JSON_PLACEHOLDER_BASE_URL}/todos`, {
    data: todoData,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log(todoData);
  console.log("\nresponse.json(): ", await response.json());

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);
});
