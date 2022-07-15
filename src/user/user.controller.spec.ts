import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from "./user.service";

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers:[UserService]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});


// @TODO zrobic podstawowe testy
// test('', ()=>{
//    //zrobić zapytanie
//   const res = fetch()
//
//   expect(res).toBeInstanceOf()
// })


//sprawdzanie czy rzuci błąd
// test('Nie rzuca błedu', ()=>{
//   expect(()=>{
//     fetch()
//   }).toThrow('tekst błedu')
// })
