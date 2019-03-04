import RingButter from '../src/ring-butter';


test('First', () => {
    const rButter = new RingButter(3);
    const pushArray = [1, 2, 3];
    pushArray.map(item => rButter.push(item));
    expect(rButter.first()).toEqual(1);  
});

test('Last', () => {
    const rButter = new RingButter(3);
    const pushArray = ['a', 'b', 'abc'];
    pushArray.map(item => rButter.push(item));
    expect(rButter.last()).toEqual('abc');
});

test('Get', () => {
    const rButter = new RingButter(3);
    const pushArray = [1, 2, 3];
    pushArray.map(item => rButter.push(item));
    pushArray.map((item, index) => expect(rButter.get(index)).toEqual(item));
});

test('Set', () => {
    const rButter = new RingButter(3);
    const pushArray = [1, 2, 3];
    pushArray.map(item => rButter.push(item));

    rButter.set(1, 'abcd');
    expect(rButter.get(1)).toEqual('abcd');
});

test('Is full', () => {
    const rButter = new RingButter(3);
    const pushArray = ['a', 'b', 'abc'];
    pushArray.map(item => rButter.push(item));

    expect(rButter.isFull()).toEqual(true);
    expect(!rButter.isFull()).toEqual(false);

    rButter.pop();
    expect(rButter.isFull()).toEqual(false);
});

test('Index of', () => {
    const rButter = new RingButter(10);
    const pushArray = [1, 2, 3, 'aa', 'bb', 'cc'];
    pushArray.map(item => rButter.push(item));

    expect(rButter.indexOf('aa')).toEqual(3);
    expect(rButter.indexOf('aa', 5)).toEqual(-1);
    expect(rButter.indexOf(undefined)).toEqual(-1);
});

test('Last index of', () => {
    const rButter = new RingButter(10);
    const pushArray = [1, 2, 3, 'aa', 'bb', 'cc'];
    pushArray.map(item => rButter.push(item));

    expect(rButter.lastIndexOf('aa')).toEqual(3);
    expect(rButter.lastIndexOf('aa', 2)).toEqual(-1);
    expect(rButter.lastIndexOf(undefined)).toEqual(-1);
});
