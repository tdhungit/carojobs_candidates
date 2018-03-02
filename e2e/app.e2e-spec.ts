import { CarojobsforcandidatePage } from './app.po';

describe('carojobsforcandidate App', () => {
  let page: CarojobsforcandidatePage;

  beforeEach(() => {
    page = new CarojobsforcandidatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
