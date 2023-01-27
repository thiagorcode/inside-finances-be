describe('findTotalizersValue', () => {
  it('should return the correct recipe, expense, and totalBalance', () => {
    const transactions = [
      { type: '+', value: 10 },
      { type: '+', value: 20 },
      { type: '-', value: 5 },
    ];

    const expectedResult = {
      recipe: 30,
      expense: 5,
      totalBalance: 25,
    };

    expect(findTotalizersValue(transactions)).toEqual(expectedResult);
  });
});
