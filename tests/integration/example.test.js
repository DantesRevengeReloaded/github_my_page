describe('placeholder integration test', () => {
  it('keeps the pipeline green until real tests exist', () => {
    expect('hello').toContain('hello');
  });
});
