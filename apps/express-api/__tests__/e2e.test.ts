import axios from 'axios';
import prisma from '@repo/database';

// ~~~~~~~~~~~~~~~~~~~~~ //
// ~   Initialize DB   ~ //
// ~~~~~~~~~~~~~~~~~~~~~ //
/*
beforeAll(async () => {
  await prisma.user.createMany({
    data: [
    {
      name: 'verifiedUser',
      id: '2',
      email: 'verified@user.com',
      emailVerified: true,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      username: 'verifiedUsername',
      displayUsername: null},
    {
      name: 'unverifiedUser',
      id: '3',
      email: 'unverified@user.com',
      emailVerified: false,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      username: 'unverifiedUsername',
      displayUsername: null},
    ],
  })
  console.log('✨ 2 users successfully created!')

  await prisma.cloud.createMany({
    data: [
    {
      name: 'cloud',
      ownerId: '2',
      image: null,
      allocatedStorage: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }],
  })
  console.log('✨ 1 cloud successfully created!')
})

// ~~~~~~~~~~~~~~~~~~~~~~ //
// ~      Clean DB      ~ //
// ~~~~~~~~~~~~~~~~~~~~~~ //

afterAll(async () => {
  const deleteUserDetails = prisma.user.deleteMany()
  const deleteCloudDetails = prisma.cloud.deleteMany()
  const deleteSessionDetails = prisma.session.deleteMany()
  const deleteAccountDetails = prisma.account.deleteMany()
  const deleteVerificationDetails = prisma.verification.deleteMany()
  
  await prisma.$transaction([
    deleteUserDetails,
    deleteCloudDetails,
    deleteSessionDetails,
    deleteAccountDetails,
    deleteVerificationDetails,
  ])

  await prisma.$disconnect()
})
*/

// ~~~~~~~~~~~~~~~~~~~~~ //
// ~     E2E Tests     ~ //
// ~~~~~~~~~~~~~~~~~~~~~ //

const API_URL = 'http://localhost:9000/api/v1/clouds';

describe('E2E Tests: GET Request, Get All Clouds', () => {
  test('GET request for all clouds with correct arguments should yield correct response', async () => {
    await axios.get(API_URL).then((response) => {
      expect(response.status).toEqual(200);
    });
    //app.get(API_URL)
    //.then((response: { status: any; }) => {
    //  expect(response.status).toEqual(200)
    //})
  });
});

/*
describe('E2E Tests: POST Request, Create a Cloud', () => {
  const cloudArgument = {
    name: 'testCloud',
    owner: testUser,
    allocatedSize: 5
  };

  test('POST request to create cloud with correct arguments should yield correct response', async() => {
    await axios.post(API_URL, testCloud)
        .then(response => {
            expect(response.status).toEqual(201);
        })
  });
})

describe('E2E Tests: GET Request, Get a Cloud', () => {
  const cloudArgument = {
    name: 'testCloud',
    owner: testUser,
    allocatedSize: 5
  };

  test('GET request for a cloud with correct arguments should yield correct response', async() => {
    await axios.get(API_URL, testCloud)
        .then(response => {
            expect(response.status).toEqual(200);
        })
    })
})

describe('E2E Tests: PATCH Request, Update a Cloud', () => {
  const cloudArgument = {
    name: 'testCloud',
    owner: testUser,
    allocatedSize: 5
  };

  test('PATCH request for a cloud with correct arguments should yield correct response', async() => {
    await axios.patch(API_URL, testCloud)
        .then(response => {
            expect(response.status).toEqual(200);
        })
    })
})

describe('E2E Tests: DELETE Request, Delete a Cloud', () => {
  const cloudArgument = {
    name: 'testCloud',
    owner: testUser,
    allocatedSize: 5
  };

  test('DELETE Request to delete a cloud with correct arguments should yield correct response', async() => {
    await axios.delete(API_URL, testCloud)
        .then(response => {
            expect(response.status).toEqual(200);
        })
    })
})
*/
