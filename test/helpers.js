import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../bin/www';

global.server = server;
global.request = supertest(server);
global.expect = chai.expect;
global.assert = chai.assert;
global.chai = chai;
global.chaiHttp = chaiHttp;