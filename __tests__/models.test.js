const supertest = require('supertest');
const { db } = require('../src/db');
const server = require('../src/server.js');

const request = supertest(server.app);

// clears our database

describe('models', () => {
  beforeEach(async () => {
    await db.sync();
  });

  // CREATES MUSICIAN
  it('creates a miusician', async () => {
    let response = await request.post('/musician').send({
      musicianType: 'Test musician',
      instrument: 'string',
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      musicianType: 'Test musician',
      instrument: 'string',
    });
  });

  //GRABS A MUSICIAN
  it('retrieves a musician', async () => {
    let createResponse = await request.post('/musician').send({
      musicianType: 'Test musician',
      instrument: 'string',
    });

    expect(createResponse.status).toBe(200);
    const createdId = createResponse.body.id;

    let retrieveResponse = await request.get(`/musician/${createdId}`);

    expect(retrieveResponse.status).toBe(200);
    expect(retrieveResponse.body).toMatchObject({
      id: createdId,
      musicianType: 'Test musician',
      instrument: 'string',
    });
  });

  //IT LISTS MUSICIAN
  let musicianType;
  it('can list a musician', async () => {
    let listMusicianRes = await request.get('/musician');
    expect(listMusicianRes.status).toBe(200);
    expect(listMusicianRes.body[0]).toHaveProperty('musicianType');
  });

  //IT DELETES MUSICIAN
  it('can delete a musician', async () => {
    const deleteRes = await request.delete(`/musician/${musicianType}`);
    expect(deleteRes.status).toBe(200);
  });

  //IT UPDATES MUSICIAN
  it('can update a musician', async () => {
    const updateRes = await request.put(`/musician/${musicianType}`);
    expect(updateRes.status).toBe(200);
  });



  // CREATES GOLFER
  it('creates a golfer', async () => {
    let response = await request.post('/golfer').send({
      golferName: 'Test golfer',
      golferCountry: 'string',
      worldRanking: '9',
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      golferName: 'Test golfer',
      golferCountry: 'string',
      worldRanking: '9',
    });
  });

  //GRABS A GOLFER
  it('retrieves a golfer', async () => {
    let createResponse = await request.post('/golfer').send({
      golferName: 'Test golfer',
      golferCountry: 'string',
      worldRanking: '9',
    });

    expect(createResponse.status).toBe(200);
    const createdId = createResponse.body.id;

    let retrieveResponse = await request.get(`/golfer/${createdId}`);

    expect(retrieveResponse.status).toBe(200);
    expect(retrieveResponse.body).toMatchObject({
      id: createdId,
      golferName: 'Test golfer',
      golferCountry: 'string',
      worldRanking: Number(9),
    });
  });

  //IT LISTS GOLFER
  let golferName;
  it('can list a golfer', async () => {
    let listGolferRes = await request.get('/golfer');
    expect(listGolferRes.status).toBe(200);
    expect(listGolferRes.body[0]).toHaveProperty('golferName');
  });

  // DELETES GOLFER
  it('can delete a golfer', async () => {
    const delRes = await request.delete(`/golfer/${golferName}`);
    expect(delRes.status).toBe(200);
  });

  //IT UPDATES GOLFER
  it('can update a golfer', async () => {
    const updateRes = await request.put(`/golfer/${musicianType}`);
    expect(updateRes.status).toBe(200);
  });


});
