import { ColoredNamePipe } from './colored-name.pipe';

describe('ColoredNamePipe', () => {
  it('create an instance', () => {
    const pipe = new ColoredNamePipe();
    expect(pipe).toBeTruthy();
  });
});
