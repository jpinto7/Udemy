import { CourseProjectAppPage } from './app.po';

describe('course-project-app App', () => {
  let page: CourseProjectAppPage;

  beforeEach(() => {
    page = new CourseProjectAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
