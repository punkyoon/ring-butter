import RingButter from '../src/ring-butter';

/**
 * Push Test
 */
test('Push items', () => {
    const rButter = new RingButter(10);
    const pushArray = [1, 2, 3, 4, 5, 6];

    pushArray.map(item => rButter.push(item));
    pushArray.map(item => expect(rButter.data).toContain(item));

    rButter.push(7);
    expect(rButter.data).toContain(7);
});

test('Push properties', () => {
    const rButter = new RingButter(3);
    rButter.push(1, 2);

    expect(rButter.start).toEqual(0);
    expect(rButter.end).toEqual(1);
    expect(rButter.length).toEqual(2);
});

test('Push overflow', () => {
    const rButter = new RingButter(5);
    const pushArray = [1, 2, 3, 4, 5, 6, 7];
    pushArray.map(item => rButter.push(item));
    expect(rButter.data).toEqual([6, 7, 3, 4, 5]);
});


/**
 * Pop Test
 */
test('Pop items', () => {
    const rButter = new RingButter(3);
    const pushArray = [1, 2, 3];
    pushArray.map(item => rButter.push(item));

    expect(rButter.pop()).toEqual(3);
    expect(rButter.pop()).toEqual(2);
    expect(rButter.toArray()).toEqual([1]);
});

test('Pop properties', () => {
    const rButter = new RingButter(3);
    rButter.push(1, 2, 3);
    rButter.pop();

    expect(rButter.end).toEqual(1);
    expect(rButter.length).toEqual(2);
})

test('Pop underflow', () => {
    const rButter = new RingButter(5);
    const pushArray = [1, 2, 3, 4, 5];
    pushArray.map(item => rButter.push(item));

    pushArray.reverse().map(item => expect(rButter.pop()).toEqual(item));
    expect(rButter.pop()).toEqual(undefined);
});


/**
 * Reverse Test
 */
test('Reverse', () => {
    const rButter = new RingButter(5);
    const pushArray = ['a', 'b', 1, 2, 3];
    pushArray.map(item => rButter.push(item));

    rButter.reverse();
    expect(rButter.data).toEqual(pushArray.reverse());
});


/**
 * Shift Test
 */
test('Shift items', () => {
    const rButter1 = new RingButter(5);
    const pushArray = [0, 'a', 1, 'bb', 3];
    pushArray.map(item => rButter1.push(item));
    pushArray.map(item => expect(rButter1.shift()).toEqual(item))

    const rButter2 = new RingButter(3);
    rButter2.push(1, 2, 3, 4);
    expect(rButter2.shift()).toEqual(2);

    const rButter3 = new RingButter(3);
    rButter3.push(1, 2, 3);
    expect(rButter3.shift()).toEqual(1);
    expect(rButter3.toArray()).toEqual([2, 3]);

    const rButter4 = new RingButter(3);
    rButter4.push(1, 2, 3, 4);
    expect(rButter4.shift()).toEqual(2);
    expect(rButter4.toArray()).toEqual([3, 4]);
});

test('Shift properties', () => {
    const rButter1 = new RingButter(5);
    rButter1.push(1, 2, 3);
    rButter1.shift();
    expect(rButter1.start).toEqual(1);
    expect(rButter1.end).toEqual(2);
    expect(rButter1.length).toEqual(2);

    const rButter2 = new RingButter(3);
    rButter2.push(1, 2, 3, 4);
    rButter2.shift();
    expect(rButter2.start).toEqual(2);
    expect(rButter2.end).toEqual(0);
    expect(rButter2.length).toEqual(2);
});

test('Unshift items', () => {
    const rButter = new RingButter(3);
    rButter.unshift('a', 'b', 'c');
    expect(rButter.data).toEqual(['c', 'b', 'a']);
    rButter.unshift(1);
    expect(rButter.data).toEqual(['c', 'b', 1]);
});

test('Unshift properties', () => {
    const rButter = new RingButter(3);

    rButter.unshift(1, 2);
    expect(rButter.start).toEqual(1);
    expect(rButter.end).toEqual(2);
    expect(rButter.length).toEqual(2);
});


/**
 * Rotate Test
 */
test('Rotate Right', () => {
    const rButter1 = new RingButter(3);
    rButter1.push(1, 2, 3);
    rButter1.rotateRight();
    expect(rButter1.toArray()).toEqual([3, 1, 2]);

    const rButter2 = new RingButter(3);
    rButter2.push(1, 2, 3);
    rButter2.rotateRight(2);
    expect(rButter2.toArray()).toEqual([2, 3, 1]);
});

test('Rotate Left', () => {
    const rButter1 = new RingButter(3);
    rButter1.push(1, 2, 3);
    rButter1.rotateLeft();
    expect(rButter1.toArray()).toEqual([2, 3, 1]);

    const rButter2 = new RingButter(3);
    rButter2.push(1, 2, 3);
    rButter2.rotateLeft(2);
    expect(rButter2.toArray()).toEqual([3, 1, 2]);
});
