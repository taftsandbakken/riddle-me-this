import { RiddleDataType, RiddleType } from 'src/types/riddle';
import { APIService } from './API.service';
import { Storage } from 'aws-amplify';

import { RiddleService } from './riddle.service';

describe('RiddleService', () => {
  const testRiddles = [
    {
      id: '0',
      title: 'title D',
      author: 'author 1',
      date: '4/23/2012',
      type: RiddleType.Logic,
      data: 'test data',
      dataType: RiddleDataType.Text
    },
    {
      id: '1',
      title: 'title A',
      author: 'author 2',
      date: '4/23/2012',
      type: RiddleType.Logic,
      data: 'testLink.mp4',
      dataType: RiddleDataType.MP4
    }
  ];

  class MockApiService {
    ListRiddles(): Promise<any> { return Promise.resolve(); }
    CreateRiddle(): Promise<any> { return Promise.resolve(); }
    DeleteRiddle(): Promise<any> { return Promise.resolve(); }
  }

  let service: RiddleService;
  let api: APIService;

  beforeEach(() => {
    api = <any>new MockApiService();
    service = new RiddleService(api);
  });

  describe('getRiddles', () => {
    it('should get riddles', () => {
      const spy = spyOn(api, 'ListRiddles').and.returnValue(Promise.resolve({ items: testRiddles }));

      const result = service.getRiddles();

      result.then(riddles => {
        expect(riddles.length).toBe(testRiddles.length);
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('addRiddles', () => {
    it('add text riddle', () => {
      const apiSpy = spyOn(api, 'CreateRiddle').and.returnValue(Promise.resolve());
      const storageSpy = spyOn(Storage, 'put');

      const result = service.addRiddle(testRiddles[0], null);

      result.then(() => {
        expect(apiSpy).toHaveBeenCalled();
        expect(storageSpy).not.toHaveBeenCalled();
      });
    });

    it('add file riddle', () => {
      const apiSpy = spyOn(api, 'CreateRiddle').and.returnValue(Promise.resolve());
      const storageSpy = spyOn(Storage, 'put').and.returnValue(Promise.resolve({ key: '' }));

      const result = service.addRiddle(testRiddles[1], <any>{});

      result.then(() => {
        expect(apiSpy).toHaveBeenCalled();
        expect(storageSpy).toHaveBeenCalled();
      });
    });
  });

  describe('deleteRiddles', () => {
    it('delete riddle', () => {
      const spy = spyOn(api, 'DeleteRiddle').and.returnValue(Promise.resolve());

      const result = service.deleteRiddle('0');

      result.then(() => {
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
