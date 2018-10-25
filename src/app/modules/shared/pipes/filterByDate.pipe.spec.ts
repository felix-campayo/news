import { FilterByDatePipe } from './filterByDate.pipe';
import { TestBed } from '@angular/core/testing';
import { News } from 'src/app/models';

describe('FilterByDatePipe', () => {
    let filterByDatePipe: FilterByDatePipe;
    const news: News[] = [
      new News('1', 'News 1', 'Body News 1', new Date('October 10, 2018 10:00:00'), false),
      new News('2', 'News 2', 'Body News 2', new Date('October 10, 2018 11:00:00'), false),
      new News('3', 'News 3', 'Body News 3', new Date('October 11, 2018 15:00:00'), false)
    ];
    beforeEach(() => {
      TestBed.configureTestingModule({ providers: [FilterByDatePipe] });
      filterByDatePipe = TestBed.get(FilterByDatePipe);
    });

  it('should return one news', () => {
    const newsAux = filterByDatePipe.transform(news, '11-10-2018');
    expect(newsAux).toEqual([news[2]]);
  });

  it('should return two news', () => {
    const newsAux = filterByDatePipe.transform(news, '10-10-2018');
    expect(newsAux).toEqual([news[0], news[1]]);
  });

  it('should return no news', () => {
    const newsAux = filterByDatePipe.transform(news, '10-11-2018');
    expect(newsAux).toEqual([]);
  });

  it('should return no news - wrong entry', () => {
    const newsAux = filterByDatePipe.transform(news, 'aaaa');
    expect(newsAux).toEqual([]);
  });

  it('should return all news - empty string', () => {
    const newsAux = filterByDatePipe.transform(news, '');
    expect(newsAux).toEqual(news);
  });
});
