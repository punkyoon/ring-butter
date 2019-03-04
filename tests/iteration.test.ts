import RingButter from '../src/ring-butter';


test('Every', () => {
    const rButter = new RingButter(4);
    rButter.push(1, 2, 3, 4);

    //ok
    expect(rButter.every((x: number) => { return ~~x === x; })).toBeTruthy();
    // if error
    expect(rButter.every((x: number) => { return x < 4; })).toBeFalsy();
});

test('Some', () => {
    const rButter = new RingButter(3);
    rButter.push(1, 2, 3, 4, 5);

    expect(rButter.some((x: number) => {  return x % 2 === 0;})).toEqual(true);
    expect(rButter.some((x: number) => {  return x % 9 === 0;})).toEqual(false);
});

test('For Each', () => {
    const rButter = new RingButter(4);
    rButter.push('a', 'b', 'c', 'd');

    const tempArray: Array<string> = [];
    rButter.forEach((x: string) => { return tempArray.push(x); });

    expect(rButter.data).toEqual(tempArray);
});
