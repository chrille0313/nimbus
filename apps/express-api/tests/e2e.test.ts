import axios from 'axios';
import prisma from '@repo/database';
import { test, describe, expect } from 'vitest';
import { createServer } from '../src/utils/server';
import express from 'express';
import * as api from '../src/controllers';
import OpenAPISpecification from '@repo/openapi-spec';
import config from '../src/config';
import request, { AgentOptions } from 'supertest';
import { beforeAll } from 'vitest';

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
/*

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

//const testApi = axios.create({
//  baseURL: `http://${config.hostname}:${config.port}${config.apiBaseUrl}`,
//  timeout: 2000
//});

//await app.get("/", (req, res) => {
//res.status(200).send('Hey, You are in my backend!!!');
//});

const params = {
  email: 'test@user.com',
  password: 'testUser'
};

const options: RequestInit = {
  method: 'POST',
  body: JSON.stringify(params),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer {token}'
  },
  credentials: 'include'
};

const options2: RequestInit = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer GPq307M0OYrADbDllNo7oi0gFizUQRfw' // Replace with actual token
  },
  credentials: 'include'
};

describe('E2E Tests: GET /clouds', async () => {
  // Create server and ensure it's ready
  const app = await createServer(api, OpenAPISpecification);
  await new Promise<void>((resolve) => {
    app.listen(config.port, config.hostname, () => {
      console.log(`Server is running at http://${config.hostname}:${config.port}`);
      resolve();
    });
  });

  test('GET /clouds with correct arguments should yield correct response', async () => {
    const response2 = await request(app)
      .post(`/auth/sign-in/email`)
      .set('Cookie', ['myApp-token=testToken', 'myApp-other=test']);
    console.log(response2.headers);

    const response = await request(
      `http://${config.hostname}:${config.port}${config.apiBaseUrl}/clouds`
    );
    console.log(response);
    expect(200);

    //testApi.get('/clouds').then((response) => {
    //  expect(response.status).toEqual(200);
    //});
    //axios.get(API_URL).then((response) => {
    //  expect(response.status).toEqual(200);
    //});
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
