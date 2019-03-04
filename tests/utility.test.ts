import RingButter from '../src/ring-butter';


test('fill', () => {
    const rButter = new RingButter(3);
    rButter.fill(1);
    expect(rButter.data).toEqual([1, 1, 1]);
    expect(rButter.toArray()).toEqual([1, 1, 1]);
});

test('empty', () => {
    const rButter = new RingButter(3);
    rButter.push(1, 2, 3);

    rButter.empty();
    expect(rButter.length).toEqual(0);
});

test('toArray', () => {
    const rButter = new RingButter(5);
    rButter.push(1, 2, 3, 'a', 'b');
    expect(rButter.toArray()).toEqual([1, 2, 3, 'a', 'b']);

    expect(new RingButter(1).toArray()).toBeInstanceOf(Array);
});

/**
 * Slice test
 */
test('slice', () => {
    // No arguments returns array of data
    const rButter1 = new RingButter(5);
    [1, 3, 5, 7, 11].map(item => rButter1.push(item));
    expect(rButter1.slice()).toEqual([1, 3, 5, 7, 11]);

    // Handle positive start and end index
    const rButter2 = new RingButter(5);
    [1, 3, 5, 7, 11].map(item => rButter2.push(item));
    expect(rButter2.slice(0)).toEqual([1, 3, 5, 7, 11]);
    expect(rButter2.slice(0, 3)).toEqual([1, 3, 5]);
    expect(rButter2.slice(1, 3)).toEqual([3, 5]);

    // Handle negative start and end index
    const rButter3 = new RingButter(5);
    [1, 3, 5, 7, 11].map(item => rButter3.push(item));
    expect(rButter3.slice(-2)).toEqual([7, 11]);
    expect(rButter3.slice(0, -2)).toEqual([1, 3, 5]);

    // Handle index outside of the buffer size
    const rButter4 = new RingButter(5);
    [1, 3, 5, 7, 11].map(item => rButter4.push(item));
    expect(rButter4.slice(0, 10)).toEqual([1, 3, 5, 7, 11]);
    expect(rButter4.slice(0, -7)).toEqual([]);
    expect(rButter4.slice(-10)).toEqual([1, 3, 5, 7, 11]);
});
