import { of } from 'rxjs';
import { RiddleType, RiddleDataType } from 'src/types/riddle';
import { AppComponent, PageState } from './app.component';
import { RiddleService } from './riddle.service';

describe('AppComponent', () => {
  const testRiddleList = [
    {
      id: '0',
      title: 'test title 1',
      author: 'test author 1',
      date: '4/23/2012',
      type: RiddleType.Logic,
      data: 'test data',
      dataType: RiddleDataType.Text
    },
    {
      id: '1',
      title: 'test title 2',
      author: 'test author 2',
      date: '4/23/2012',
      type: RiddleType.Logic,
      data: 'testLink.mp4',
      dataType: RiddleDataType.MP4
    },
    {
      id: '2',
      title: 'test title 3',
      author: 'test author 3',
      date: '4/23/2012',
      type: RiddleType.Kids,
      data: 'test data 3',
      dataType: RiddleDataType.Text
    },
    {
      id: '3',
      title: 'test title 4',
      author: 'test author 4',
      date: '4/23/2012',
      type: RiddleType.Logic,
      data: 'testLink.png',
      dataType: RiddleDataType.Img
    }
  ];

  class MockRiddleService {
    getRiddles(): Promise<any> { return Promise.resolve(); }
    addRiddle(): Promise<any> { return Promise.resolve(); }
    deleteRiddle(): Promise<any> { return Promise.resolve(); }
  }

  let component: AppComponent;
  let riddleService: RiddleService;

  beforeEach(() => {
    riddleService = <any>new MockRiddleService();
    component = new AppComponent(riddleService);
  });

  describe('ngOnInit', () => {
    it('should get riddles', () => {
      const spy = spyOn(riddleService, 'getRiddles').and.returnValue(Promise.resolve(testRiddleList));

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
      expect(component.pageState).toBe(PageState.Ready);
      expect(component.riddleList.length).toBe(testRiddleList.length);
    });

    it('should fail to get riddles', () => {
      const spy = spyOn(riddleService, 'getRiddles').and.returnValue(Promise.reject());

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
      expect(component.pageState).toBe(PageState.Error);
      expect(component.riddleList.length).toBe(0);
    });
  });

  describe('addRiddle', () => {
    it('should add a new riddle', () => {
      const spy = spyOn(riddleService, 'addRiddle').and.returnValue(Promise.resolve());
      expect(component.isAddRiddleLoading).toBeFalsy();
      expect(component.riddleList.length).toBe(0);

      component.addRiddle({}, <any>{ riddleTitle: { value: testRiddleList[0].title }, riddleAuthor: { value: testRiddleList[0].author } });

      expect(spy).toHaveBeenCalled();
      expect(component.pageState).toBe(PageState.Ready);
      expect(component.riddleList.length).toBe(testRiddleList.length);
    });
  });
});
