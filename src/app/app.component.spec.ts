import { fakeAsync, flush, tick } from '@angular/core/testing';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { RiddleType, RiddleDataType } from 'src/types/riddle';
import { AppComponent, PageState } from './app.component';
import { RiddleService } from './riddle.service';

describe('AppComponent', () => {
  const testRiddleList = [
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
    },
    {
      id: '2',
      title: 'title C',
      author: 'author 3',
      date: '4/23/2012',
      type: RiddleType.Kids,
      data: 'test data 3',
      dataType: RiddleDataType.Text
    },
    {
      id: '3',
      title: 'title B',
      author: 'author 4',
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
    it('should get riddles', fakeAsync(() => {
      const spy = spyOn(riddleService, 'getRiddles').and.returnValue(Promise.resolve(testRiddleList));

      component.ngOnInit();
      tick();

      expect(spy).toHaveBeenCalled();
      expect(component.pageState).toBe(PageState.Ready);
      expect(component.riddleList.length).toBe(testRiddleList.length);
    }));

    it('should fail to get riddles', fakeAsync(() => {
      const spy = spyOn(riddleService, 'getRiddles').and.returnValue(Promise.reject());

      component.ngOnInit();
      tick();

      expect(spy).toHaveBeenCalled();
      expect(component.pageState).toBe(PageState.Error);
      expect(component.riddleList.length).toBe(0);
    }));
  });

  describe('addRiddle', () => {
    it('should add a new riddle', fakeAsync(() => {
      component.selectedFile = <any>{ type: '' };
      const spy = spyOn(riddleService, 'addRiddle').and.returnValue(Promise.resolve());
      expect(component.isAddRiddleLoading).toBeFalsy();
      expect(component.riddleList.length).toBe(0);

      component.addRiddle({}, <any>{ riddleTitle: {
        value: testRiddleList[0].title },
        riddleAuthor: { value: testRiddleList[0].author },
        riddleText: { value: testRiddleList[0].data } });
      expect(component.isAddRiddleLoading).toBeTruthy();
      tick();

      expect(spy).toHaveBeenCalled();
      expect(component.selectedFile).toBeNull();
      expect(component.isAddRiddleLoading).toBeFalsy();
      expect(component.riddleList.length).toBe(1);
      flush();
    }));

    it('should fail to add a new riddle', fakeAsync(() => {
      component.selectedFile = <any>{ type: '' };
      const spy = spyOn(riddleService, 'addRiddle').and.returnValue(Promise.reject());
      expect(component.isAddRiddleLoading).toBeFalsy();
      expect(component.riddleList.length).toBe(0);

      const form = <any>{ riddleTitle: {
        value: testRiddleList[0].title },
        riddleAuthor: { value: testRiddleList[0].author },
        riddleText: { value: testRiddleList[0].data } };

      component.addRiddle({}, form);
      expect(component.isAddRiddleLoading).toBeTruthy();
      tick();

      expect(spy).toHaveBeenCalled();
      expect(component.selectedFile).not.toBeNull();
      expect(component.isAddRiddleLoading).toBeFalsy();
      expect(component.riddleList.length).toBe(0);
      flush();
    }));
  });

  describe('deleteRiddle', () => {
    it('should cancel and not delete a riddle', (done) => {
      component.riddleList = testRiddleList;
      const spy = spyOn(riddleService, 'deleteRiddle').and.returnValue(Promise.resolve());
      expect(component.riddleList.length).toBe(testRiddleList.length);

      component.deleteRiddle('0');
      expect(Swal.isVisible()).toBeTruthy();
      Swal.clickCancel();

      setTimeout(() => {
        expect(spy).not.toHaveBeenCalled();
        expect(component.riddleList.length).toBe(testRiddleList.length);
        done();
      });
    });

    it('should delete a riddle', (done) => {
      component.riddleList = testRiddleList;
      const spy = spyOn(riddleService, 'deleteRiddle').and.returnValue(Promise.resolve());
      expect(component.riddleList.length).toBe(testRiddleList.length);

      component.deleteRiddle('0');
      expect(Swal.isVisible()).toBeTruthy();
      Swal.clickConfirm();

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        expect(component.riddleList.length).toBe(testRiddleList.length - 1);
        done();
      });
    });

    it('should fail to delete a riddle', (done) => {
      component.riddleList = testRiddleList;
      const spy = spyOn(riddleService, 'deleteRiddle').and.returnValue(Promise.reject());
      expect(component.riddleList.length).toBe(testRiddleList.length);

      component.deleteRiddle('0');
      expect(Swal.isVisible()).toBeTruthy();
      Swal.clickConfirm();

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        expect(component.riddleList.length).toBe(testRiddleList.length);
        done();
      });
    });
  });

  describe('onFileSelected', () => {
    it('should set fileSelected based on files selected in the explorer', () => {
      component.selectedFile = null;

      component.onFileSelected(null);
      expect(component.selectedFile).toBeNull();

      component.onFileSelected([]);
      expect(component.selectedFile).toBeNull();

      component.onFileSelected([ {} ]);
      expect(component.selectedFile).not.toBeNull();

      component.onFileSelected([ {}, {} ]);
      expect(component.selectedFile).not.toBeNull();
    });
  });

  describe('filterRiddles', () => {
    it('should sort and filter riddles with no search input and using All category', () => {
      component.riddleList = [ ...testRiddleList ];
      component.riddleTypeSelected = RiddleType.All;

      const result = component.filterRiddles();
      expect(result.length).toBe(testRiddleList.length);
      expect(result[0].id).toBe('1');
      expect(result[1].id).toBe('3');
      expect(result[2].id).toBe('2');
      expect(result[3].id).toBe('0');
    });

    it('should sort and filter riddles with no search input and using Logic category', () => {
      component.riddleList = [ ...testRiddleList ];
      component.riddleTypeSelected = RiddleType.Logic;

      const result = component.filterRiddles();
      expect(result.length).toBe(3);
      expect(result[0].id).toBe('1');
      expect(result[1].id).toBe('3');
      expect(result[2].id).toBe('0');
    });

    it('should sort and filter riddles with no search input and using empty WhatAmI category', () => {
      component.riddleList = [ ...testRiddleList ];
      component.riddleTypeSelected = RiddleType.WhatAmI;

      const result = component.filterRiddles();
      expect(result.length).toBe(0);
    });
  });

  describe('filterBySearch', () => {
    it('should determine if a riddle should be displayed for empty search input', () => {
      component.searchInput = '';
      expect(component['filterBySearch'](testRiddleList[0])).toBeTruthy();
      expect(component['filterBySearch'](testRiddleList[1])).toBeTruthy();
      expect(component['filterBySearch'](testRiddleList[2])).toBeTruthy();
      expect(component['filterBySearch'](testRiddleList[3])).toBeTruthy();

      // Test whitespace
      component.searchInput = ' ';
      expect(component['filterBySearch'](testRiddleList[0])).toBeTruthy();
      expect(component['filterBySearch'](testRiddleList[1])).toBeTruthy();
      expect(component['filterBySearch'](testRiddleList[2])).toBeTruthy();
      expect(component['filterBySearch'](testRiddleList[3])).toBeTruthy();
    });

    it('should determine if a riddle should be displayed for title search input', () => {
      component.searchInput = 'title a         ';
      expect(component['filterBySearch'](testRiddleList[0])).toBeFalsy();
      expect(component['filterBySearch'](testRiddleList[1])).toBeTruthy();
      expect(component['filterBySearch'](testRiddleList[2])).toBeFalsy();
      expect(component['filterBySearch'](testRiddleList[3])).toBeFalsy();
    });

    it('should determine if a riddle should be displayed for author search input', () => {
      component.searchInput = ' aUThor 3';
      expect(component['filterBySearch'](testRiddleList[0])).toBeFalsy();
      expect(component['filterBySearch'](testRiddleList[1])).toBeFalsy();
      expect(component['filterBySearch'](testRiddleList[2])).toBeTruthy();
      expect(component['filterBySearch'](testRiddleList[3])).toBeFalsy();
    });

    it('should determine if a riddle should be displayed for data search input', () => {
      component.searchInput = 'test';
      expect(component['filterBySearch'](testRiddleList[0])).toBeTruthy();
      expect(component['filterBySearch'](testRiddleList[1])).toBeFalsy();
      expect(component['filterBySearch'](testRiddleList[2])).toBeTruthy();
      expect(component['filterBySearch'](testRiddleList[3])).toBeFalsy();
    });
  });

  describe('createRiddleObject', () => {
    it('should create a riddle object of Text type', () => {
      component.selectedFile = null;
      component.riddleTypeSelectedForAdd = RiddleType.Kids;
      const form = <any>{ riddleTitle: {
        value: testRiddleList[0].title },
        riddleAuthor: { value: testRiddleList[0].author },
        riddleText: { value: testRiddleList[0].data } };

      const result = component['createRiddleObject'](form);

      expect(result.title).toBe(testRiddleList[0].title);
      expect(result.author).toBe(testRiddleList[0].author);
      expect(result.data).toBe(testRiddleList[0].data);
      expect(result.type).toBe(RiddleType.Kids);
      expect(result.dataType).toBe(RiddleDataType.Text);
    });

    it('should create a riddle object of Img type', () => {
      component.selectedFile = <any>{ name: 'testFile.png', type: 'image/jpg' };
      component.riddleTypeSelectedForAdd = RiddleType.Logic;
      const form = <any>{ riddleTitle: {
        value: testRiddleList[0].title },
        riddleAuthor: { value: testRiddleList[0].author },
        riddleText: { value: testRiddleList[0].data } };

      const result = component['createRiddleObject'](form);

      expect(result.title).toBe(testRiddleList[0].title);
      expect(result.author).toBe(testRiddleList[0].author);
      expect(result.data).toBe(component.selectedFile.name);
      expect(result.type).toBe(RiddleType.Logic);
      expect(result.dataType).toBe(RiddleDataType.Img);
    });

    it('should create a riddle object of Img type', () => {
      component.selectedFile = <any>{ name: 'testFile.mp4', type: 'video/mp4' };
      component.riddleTypeSelectedForAdd = RiddleType.WhatAmI;
      const form = <any>{ riddleTitle: {
        value: testRiddleList[0].title },
        riddleAuthor: { value: testRiddleList[0].author },
        riddleText: { value: testRiddleList[0].data } };

      const result = component['createRiddleObject'](form);

      expect(result.title).toBe(testRiddleList[0].title);
      expect(result.author).toBe(testRiddleList[0].author);
      expect(result.data).toBe(component.selectedFile.name);
      expect(result.type).toBe(RiddleType.WhatAmI);
      expect(result.dataType).toBe(RiddleDataType.MP4);
    });
  });
});
