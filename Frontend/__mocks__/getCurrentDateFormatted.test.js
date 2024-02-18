// __mocks__/getCurrentDateFormatted.test.js

// Mock do objecto Date object para sempre retornar uma data específica
const mockDate = new Date('2022-01-01');
global.Date = jest.fn(() => mockDate);

const { getCurrentDateFormatted } = require('./getCurrentDateFormatted');

test('getCurrentDateFormatted should return formatted date', () => {
    const result = getCurrentDateFormatted();
    expect(result).toBe('2022-01-01');
});

