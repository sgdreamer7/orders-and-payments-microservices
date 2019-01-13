import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('OrderController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/orders (GET)', () => {
    return request(app.getHttpServer())
      .get('/orders')
      .expect(200);
  });

  it('/orders (POST)', (done) => {
    const mockedOrder = {
      payload: {
        article: 'ASDEFG',
        quantity: 5,
        price: 10.25,
        options: 'red'
      }
    };
    return request(app.getHttpServer())
      .post('/orders')
      .send(mockedOrder)
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, result) => {
        expect(result.body.payload).toEqual(mockedOrder.payload);
        done();
      });
  });

  it('/orders/{id} (DELETE)', (done) => {
    return request(app.getHttpServer())
      .delete('/orders/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        expect(result.body.state).toEqual('Cancelled');
        done();
      });
  });

  it('/orders/{id}/status (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/orders/1/status')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        expect(result.text).toEqual('Cancelled');
        done();
      });
  });
});
