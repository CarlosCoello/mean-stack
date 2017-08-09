import { MeanStackTodoPage } from './app.po';

describe('mean-stack-todo App', () => {
  let page: MeanStackTodoPage;

  beforeEach(() => {
    page = new MeanStackTodoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
