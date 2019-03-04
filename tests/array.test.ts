import RingButter from '../src/ring-butter';

test('Construction', () => {
    expect(new RingButter(1)).toBeInstanceOf(RingButter);
});

test('Missing arguments exception', () => {
    const errorObject = new Error('Missing Argument: You must pass a valid buffer size');

    try { new RingButter(-1); } catch (error) {
        expect(error).toEqual(errorObject);
    }

    try { new RingButter(0); } catch (error) {
        expect(error).toEqual(errorObject);
    }
});

test('data', () => {
    expect(new RingButter(3).data).toEqual([undefined, undefined, undefined]);
});

test('start', () => {
    expect(new RingButter(3).start).toEqual(0);
});

test('end', () => {
    expect(new RingButter(3).end).toEqual(2);
});

test('size', () => {
    expect(new RingButter(3).size).toEqual(3);
});

test('length', () => {
    expect(new RingButter(3).length).toEqual(0);
});
