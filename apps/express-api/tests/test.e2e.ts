import { test, describe, expect } from 'vitest';
import { createServer } from '../src/utils/server';
import api from '../src/controllers';
import OpenAPISpecification from '@repo/openapi-spec';
import config from '../src/config';
import request from 'supertest';

const userWithClouds = { username: 'testUsername', password: 'testUser', email: 'test@user.com' };
const userWithoutClouds = {
  username: 'testUsername2',
  password: 'testUser2',
  email: 'test@user2.com'
};
const otherUserWithClouds = {
  username: 'testUsername3',
  password: 'testUser3',
  email: 'test@user3.com'
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~     E2E Tests : Clouds     ~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

describe('E2E Tests: GET /clouds', async () => {
  const app = startBackendServer();
  const agent = request.agent(await app);

  test('Request with no arguments should yield status code 200 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);

    const response = await agent.get('/api/v1/clouds');
    expect(response.status).toEqual(200);
    expect(response.body.data[0].name).toEqual('cloud');
    expect(response.body.data[0].owner.name).toEqual('testUser');
    expect(response.body.data[0].image).toEqual(null);
    expect(response.body.data[0].allocatedStorage).toEqual('5');
    expect(response.body.data[0].sharedWith).toEqual([]);
  });

  test('Request with additional arguments should have the arguments ignored and yield status code 200 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);

    const response = await agent.get('/api/v1/clouds').send({ id: '1234', nonsense: 'Nonsense' });
    expect(response.status).toEqual(200);
    expect(response.status).toEqual(200);
    expect(response.body.data[0].name).toEqual('cloud');
    expect(response.body.data[0].owner.name).toEqual('testUser');
    expect(response.body.data[0].image).toEqual(null);
    expect(response.body.data[0].allocatedStorage).toEqual('5');
    expect(response.body.data[0].sharedWith).toEqual([]);
  });

  test('Request with user without any assigned clouds should yield status code 200 and empty body', async () => {
    await userSignIn(agent, userWithoutClouds);

    const response = await agent.get('/api/v1/clouds');
    expect(response.status).toEqual(200);
    expect(response.body.data).toEqual([]);
  });

  test('Request without signing in should yield status code 401 and correct response body', async () => {
    const response = await agent.get('/api/v1/clouds');

    expect(response.status).toEqual(401);
    expect(response.body.data.message).toEqual('Unauthorized access');
    expect(response.body.data.reason).toEqual('Invalid or missing authentication');
  });
});

describe('E2E Tests: POST /clouds', async () => {
  const app = startBackendServer();
  const agent = request.agent(await app);

  test('Request with correct arguments and no image should yield status code 201 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);
    const response = await agent
      .post('/api/v1/clouds')
      .send({ name: 'NewCloud', allocatedStorage: '2' });
    expect(response.status).toEqual(201);
    expect(response.body.data.name).toEqual('NewCloud');
    expect(response.body.data.allocatedStorage).toEqual('2');
    expect(response.body.data.image).toEqual(null);
  });

  test('Request with assignedStorage less than 1 should yield status code 400 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);
    const response = await agent
      .post('/api/v1/clouds')
      .send({ name: 'NewCloud', allocatedStorage: '0' });
    expect(response.status).toEqual(400);
    expect(response.body.data.message).toEqual('Bad Request');
    expect(response.body.data.reason).toEqual(
      'request/body/allocatedStorage must match pattern "^[1-9]\\d*$"'
    );
  });

  test('Request with mismatched type for name should yield status code 400 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);
    const response = await agent.post('/api/v1/clouds').send({ name: 2, allocatedStorage: '2' });
    expect(response.status).toEqual(400);
    expect(response.body.data.message).toEqual('Bad Request');
    expect(response.body.data.reason).toEqual('request/body/name must be string');
  });

  test('Request with mismatched type for image should yield status code 400 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);
    const response = await agent
      .post('/api/v1/clouds')
      .send({ name: 'NewCloud', allocatedStorage: '2', image: 2 });
    expect(response.status).toEqual(400);
    expect(response.body.data.message).toEqual('Bad Request');
    expect(response.body.data.reason).toEqual('request/body/image must be null,string');
  });

  test('Request with mismatched type for allocatedStorage should yield status code 400 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);
    const response = await agent
      .post('/api/v1/clouds')
      .send({ name: 'NewCloud', allocatedStorage: 2 });
    expect(response.status).toEqual(400);
    expect(response.body.data.message).toEqual('Bad Request');
    expect(response.body.data.reason).toEqual('request/body/allocatedStorage must be string');
  });

  test('Request without signing in should yield status code 401 and correct response body', async () => {
    const response = await agent
      .post('/api/v1/clouds')
      .send({ name: 'NewCloud', allocatedStorage: '2' });
    expect(response.status).toEqual(401);
    expect(response.body.data.message).toEqual('Unauthorized access');
    expect(response.body.data.reason).toEqual('Invalid or missing authentication');
  });
});

describe('E2E Tests: GET /clouds/{id}', async () => {
  const app = startBackendServer();
  const agent = request.agent(await app);

  test('Request with no arguments should yield status code status code 200 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);
    const cloudId = await getCloudId(agent, 0);

    const response = await agent.get(`/api/v1/clouds/${cloudId}`);
    expect(response.status).toEqual(200);
    expect(response.body.data.name).toEqual('cloud');
    expect(response.body.data.owner.name).toEqual('testUser');
    expect(response.body.data.image).toEqual(null);
    expect(response.body.data.allocatedStorage).toEqual('5');
    expect(response.body.data.sharedWith).toEqual([]);
  });

  test('Request with incorrect path should yield status code 400 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);

    const response = await agent.get(`/api/v1/clouds/0`);
    expect(response.status).toEqual(400);
    expect(response.body.data.message).toEqual('Bad Request');
    expect(response.body.data.reason).toEqual('request/params/id must match format "uuid"');
  });

  test('Request without signing in should yield status code 401 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);
    const cloudId = await getCloudId(agent, 0);
    await userSignOut(agent);

    const response = await agent.get(`/api/v1/clouds/${cloudId}`);
    expect(response.status).toEqual(401);
    expect(response.body.data.message).toEqual('Unauthorized access');
    expect(response.body.data.reason).toEqual('Invalid or missing authentication');
  });

  test('Request to get clouds from different user should yield status code 404 and correct response body', async () => {
    await userSignIn(agent, otherUserWithClouds);
    const cloudId = await getCloudId(agent, 0);
    await userSignOut(agent);
    await userSignIn(agent, userWithClouds);

    const response = await agent.get(`/api/v1/clouds/${cloudId}`);
    expect(response.status).toEqual(404);
    expect(response.body.data.message).toEqual('Requested resource not found');
    expect(response.body.data.reason).toEqual('The requested resource does not exist');
  });
});

describe('E2E Tests: PATCH /clouds/{id}', async () => {
  const app = startBackendServer();
  const agent = request.agent(await app);

  test('Request with correct arguments and no image should return status code 200 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);
    const cloudId = await getCloudId(agent, 0);

    const response = await agent
      .patch(`/api/v1/clouds/${cloudId}`)
      .send({ name: 'otherCloud', allocatedStorage: '10' });
    expect(response.status).toEqual(200);
    expect(response.body.data.id).toEqual(cloudId);
    expect(response.body.data.name).toEqual('otherCloud');
    expect(response.body.data.owner.name).toEqual('testUser');
    expect(response.body.data.image).toEqual(null);
    expect(response.body.data.allocatedStorage).toEqual('10');
  });

  test('Request with incorrect path should yield status code 400 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);

    const response = await agent
      .patch(`/api/v1/clouds/0`)
      .send({ name: 'otherCloud', allocatedStorage: '10' });
    expect(response.status).toEqual(400);
    expect(response.body.data.message).toEqual('Bad Request');
    expect(response.body.data.reason).toEqual('request/params/id must match format "uuid"');
  });

  test('Request with missing name parameter should yield status code 200 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);
    const cloudId = await getCloudId(agent, 0);

    const response = await agent
      .patch(`/api/v1/clouds/${cloudId}`)
      .send({ allocatedStorage: '10' });
    expect(response.status).toEqual(200);
    expect(response.body.data.id).toEqual(cloudId);
    expect(response.body.data.name).toEqual('cloud');
    expect(response.body.data.owner.name).toEqual('testUser');
    expect(response.body.data.image).toEqual(null);
    expect(response.body.data.allocatedStorage).toEqual('10');
  });

  test('Request with missing allocatedStorage parameter should yield status code 200 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);
    const cloudId = await getCloudId(agent, 0);

    const response = await agent.patch(`/api/v1/clouds/${cloudId}`).send({ name: 'otherCloud' });
    expect(response.status).toEqual(200);
    expect(response.body.data.id).toEqual(cloudId);
    expect(response.body.data.name).toEqual('otherCloud');
    expect(response.body.data.owner.name).toEqual('testUser');
    expect(response.body.data.image).toEqual(null);
    expect(response.body.data.allocatedStorage).toEqual('5');
  });

  test('Request missing all parameters should yield status code 400 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);
    const cloudId = await getCloudId(agent, 0);

    const response = await agent.patch(`/api/v1/clouds/${cloudId}`).send({});
    expect(response.status).toEqual(200);
    expect(response.body.data.id).toEqual(cloudId);
    expect(response.body.data.name).toEqual('cloud');
    expect(response.body.data.owner.name).toEqual('testUser');
    expect(response.body.data.image).toEqual(null);
    expect(response.body.data.allocatedStorage).toEqual('5');
  });

  test('Request with type mismatch for name parameter should yield status code 400 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);
    const cloudId = await getCloudId(agent, 0);

    const response = await agent
      .patch(`/api/v1/clouds/${cloudId}`)
      .send({ name: 2, allocatedStorage: '10' });
    expect(response.status).toEqual(400);
    expect(response.body.data.message).toEqual('Bad Request');
    expect(response.body.data.reason).toEqual('request/body/name must be string');
  });

  test('Request with type mismatch for allocatedStorage parameter should yield code 400 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);
    const cloudId = await getCloudId(agent, 0);

    const response = await agent
      .patch(`/api/v1/clouds/${cloudId}`)
      .send({ name: 'otherCloud', allocatedStorage: 10 });
    expect(response.status).toEqual(400);
    expect(response.body.data.message).toEqual('Bad Request');
    expect(response.body.data.reason).toEqual('request/body/allocatedStorage must be string');
  });

  test('Request with type mismatch for image parameter should yield status code 400 and correct response body ', async () => {
    await userSignIn(agent, userWithClouds);
    const cloudId = await getCloudId(agent, 0);

    const response = await agent
      .patch(`/api/v1/clouds/${cloudId}`)
      .send({ name: 'otherCloud', allocatedStorage: '10', image: 2 });
    expect(response.status).toEqual(400);
    expect(response.body.data.message).toEqual('Bad Request');
    expect(response.body.data.reason).toEqual('request/body/image must be null,string');
  });

  test('Request with allocatedStorage less than 1 should yield status code 400 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);
    const cloudId = await getCloudId(agent, 0);

    const response = await agent
      .patch(`/api/v1/clouds/${cloudId}`)
      .send({ name: 'otherCloud', allocatedStorage: '0' });
    expect(response.status).toEqual(400);
    expect(response.body.data.message).toEqual('Bad Request');
    expect(response.body.data.reason).toEqual(
      'request/body/allocatedStorage must match pattern "^[1-9]\\d*$"'
    );
  });

  test('Request without signing in should yield status code 401 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);
    const cloudId = await getCloudId(agent, 0);
    await userSignOut(agent);

    const response = await agent
      .patch(`/api/v1/clouds/${cloudId}`)
      .send({ name: 'otherCloud', allocatedStorage: '10' });
    expect(response.status).toEqual(401);
    expect(response.body.data.message).toEqual('Unauthorized access');
    expect(response.body.data.reason).toEqual('Invalid or missing authentication');
  });

  test('Request to patch clouds from different user should yield status code 403 and correct response body', async () => {
    await userSignIn(agent, otherUserWithClouds);
    const cloudId = await getCloudId(agent, 0);
    await userSignOut(agent);
    await userSignIn(agent, userWithClouds);

    const response = await agent
      .patch(`/api/v1/clouds/${cloudId}`)
      .send({ name: 'otherCloud', allocatedStorage: '10' });
    expect(response.status).toEqual(404);
    expect(response.body.data.message).toEqual('Requested resource not found');
    expect(response.body.data.reason).toEqual('The requested resource does not exist');
  });
});

describe('E2E Tests: DELETE /clouds/{id}', async () => {
  const app = startBackendServer();
  const agent = request.agent(await app);

  test('Request with no arguments should yield status code 200 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);
    const cloudId = await getCloudId(agent, 0);

    const response = await agent.delete(`/api/v1/clouds/${cloudId}`);
    expect(response.status).toEqual(200);
    expect(response.body.data).toEqual(null);
  });

  test('Request with additional arguments should have arguments ignored and yield status code 200 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);
    const cloudId = await getCloudId(agent, 0);

    const response = await agent
      .delete(`/api/v1/clouds/${cloudId}`)
      .send({ name: 'newName', nonsense: 'Nonsense' });
    expect(response.status).toEqual(200);
    expect(response.body.data).toEqual(null);
  });

  test('Request with incorrect path parameter should yield status code 400 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);

    const response = await agent.delete(`/api/v1/clouds/0`);
    expect(response.status).toEqual(400);
  });

  test('Request without signing in should yield status code 401 and correct response body', async () => {
    await userSignIn(agent, userWithClouds);
    const cloudId = await getCloudId(agent, 0);
    await userSignOut(agent);

    const response = await agent.delete(`/api/v1/clouds/${cloudId}`);
    expect(response.status).toEqual(401);
  });

  test('Request to delete clouds from different user should yield status code 404 and correct response body', async () => {
    await userSignIn(agent, otherUserWithClouds);
    const cloudId = await getCloudId(agent, 0);
    await userSignOut(agent);
    await userSignIn(agent, userWithClouds);

    const response = await agent.delete(`/api/v1/clouds/${cloudId}`);
    expect(response.status).toEqual(404);
    expect(response.body.data.message).toEqual('Requested resource not found');
    expect(response.body.data.reason).toEqual('The requested resource does not exist');
  });
});

// Helper Functions

async function startBackendServer() {
  const app = await createServer(api, OpenAPISpecification);
  app.listen(config.port, config.hostname, () => {
    console.log(`Server is running at http://${config.hostname}:${config.port}`);
  });
  return app;
}

async function userSignIn(agent, userParams) {
  await agent.post('/api/v1/auth/sign-in/email').send({
    username: userParams.username,
    password: userParams.password,
    email: userParams.email
  });
}

async function userSignOut(agent) {
  await agent.post('/api/v1/auth/sign-out');
}

async function getCloudId(agent, int) {
  const response = await agent.get('/api/v1/clouds');
  return response.body.data[int].id;
}
