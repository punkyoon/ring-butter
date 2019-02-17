
class CircularArray {
    data: Array<any>;
    end: number;
    length: number;    // current size of buffer
    overflow: any;
    size: number;    // size of buffer
    start: number;

    constructor(length: number) {
        if (length <= 0) {
            throw new Error('Missing Argument: You must pass a valid buffer length');
        }

        this.size = this.length =  length;
        this.start = 0;
        this.end = this.length -1;

        this.overflow = null;

        this.data = new Array(this.length);
    }

    /**
     * Basic API
     * push, pop, reverse, rotateLeft, rotateRight, shift, unshift
    */

    // Push item into buffer
    push = (...item: any) => {
        let idx = 0;

        // Check if overflow is set, and if data is about to be overwritten
        if (this.overflow && this.length + item.length > this.size) {
            while (idx < this.length + item.length - this.size) {
                // Call overflow function and send data that's about to be overwritten
                this.overflow(this.data[(this.end + idx + 1) % this.size], this);
                idx++;
            }
        }

        // Push items to the end
        for(idx = 0; idx<item.length; idx++)
            this.data[(this.end + idx + 1) % this.size] = item[idx];

        // Recalculate length
        if (this.length < this.size) {
            this.length = this.length + idx > this.size ? this.size : this.length + idx;
        }

        this.end = (this.end + idx) % this.size;    // Recalculate end
        this.start = (this.size + this.end - this.length + 1) % this.size;    // Recalculate start

        return this.length;
    }

    // Pop item from buffer
    pop = () => {
        let item;

        if (this.length === 0) return;

        item = this.data[this.end];
        delete this.data[this.end];
        this.end = (this.end - 1 + this.size) % this.size;
        this.length--;
        
        return item;
    }

    // Reverse order of the buffer
    reverse = () => {
        let idx = 0, temp;

        while (idx < ~~(this.length / 2)) {
            temp = this.data
            this.data[(this.start + idx) % this.size];
            this.data[(this.start + idx) % this.size] = this.data[(this.start + (this.length - idx - 1)) % this.size];
            this.data[(this.start + (this.length - idx - 1)) % this.size] = temp;

            idx++;
        }

        //return this;    // TODO: fix it!
    }

    // Rotate buffer to the left by cursor, or by 1
    rotateLeft = (cursor: number = 1) => {
        if (typeof cursor !== 'number') throw new Error('Argument must be a number');

        while (--cursor >= 0) this.push(this.shift());
        //return this;    // TODO: fix it!
    }

    // Rotate buffer to the right by cursor, or by 1
    rotateRight = (cursor: number = 1) => {
        if (typeof cursor !== 'number') throw new Error('Argument must be a number');

        while (--cursor >= 0) this.unshift(this.pop());
        //return this;    // TODO: fix it!
    }

    // Remove first element from buffer and return that
    shift = () => {
        let item;

        if (this.length === 0) return;

        item = this.data[this.start];
        this.start = (this.start + 1) % this.size;
        this.length--;

        return item;
    }

    // Add item to beginning of buffer
    unshift = (...item: any) => {
        let idx = 0;

        // Check if overflow is set, and if data is about to be overwritten
        if (this.overflow && this.length + item.length > this.size) {
            while (idx < this.length + item.length - this.size) {
                this.overflow(this.data[this.end - (idx % this.size)], this);
                idx++;
            }
        }

        for (idx = 0; idx < item.length; idx++)
            this.data[(this.size + this.start - (idx % this.size) - 1) % this.size] = item[idx];

        if (this.size - this.length - idx < 0) {
            this.end += this.size - this.length - idx;
            if (this.end < 0) this.end = this.size + (this.end % this.size);
        }
        if (this.length < this.size) {
            this.length = this.length + idx > this.size ? this.size : this.length + idx;
        }

        // this.start -= arguments.length;
        this.start -= item.length;
        if (this.start < 0) this.start = this.size + (this.start % this.size);

        return this.length;
    }

    /**
     * Accessing API
     * indexOf, lastIndexOf, first, last, get, isFull, set, empty
     */

    first = () => { return this.data[this.start]; }
    last = () => { return this.data[this.end]; }

    get = (idx: number) => { return this.data[(this.start + idx) % this.size]; }
    set = (idx: number, value: any) => { return this.data[(this.start + idx) % this.size] = value; }

    isFull = () => { return this.size === this.length; }

    // Return index of first matched element
    indexOf = (value: any, idx: number = 0) => {
        while (idx < this.length) {
            if (this.data[(this.start + idx) % this.size] === value) return idx;
            idx++;
        }

        return -1;
    }

    // Return index of last matched element
    lastIndexOf = (value: any, idx: number = this.length - 1) => {
        while (idx >= 0) {
            if (this.data[(this.start + idx) % this.size] === value) return idx;
            idx--;
        }

        return -1;
    }


    /**
     * Iteration API
     * every, forEach, some
     */

    // TODO: fix it!
    // Check every item in the array against a test
    every = (callback: any, context: any) => {
        let idx = 0;

        while (idx < this.length) {
            if (!callback.call(context, this.data[(this.start + idx) % this.size], idx, this))
                return false;
            idx++;
        }

        return true;
    }

    forEach = (callback: any, context: any) => {
        let idx =0;

        while (idx < this.length) {
            callback.call(context, this.data[(this.start + idx) % this.size], idx, this);
            idx++;
        }
    }

    some = (callback: any, context: any) => {
        let idx=0;
        while (idx < this.length) {
            if (callback.call(context, this.data[(this.start + idx) % this.size], idx, this))
                return true;
        }
        return false;
    }


    /**
     * Utility API
     * fill, toArray, slice
     */

    fill = (arg: any) => {
        let idx = 0;

        if (typeof arg === 'function') while (this.data[idx] = arg(), ++idx < this.size);
        else while (this.data[idx] = arg, ++idx < this.size);

        this.start = 0;
        this.end = this.size - 1;
        this.length = this.size;

        //return this;    // TODO: fix it
    }

    empty = () => {
        this.length = this.start = 0;
        this.end = this.size - 1;
        //return this;    // TODO: fix it!
    }

    toArray = () => {
        return this.slice();
    }

    slice = (start?: number, end?: number) => {
        let size = this.length;
        start = start || 0;

        if (start < 0) {
            if (typeof end === 'number' && start >= end) return [];
            start = (-start > size) ? 0 : size + start;
        }

        if (end === null || (typeof end === 'number' && end > size)) end = size;
        else if (typeof end === 'number' && end < 0) end += size;
        else end = end || 0;

        size = start < end ? end - start : 0;

        let result = Array(size);
        for(let idx = 0; idx < size; idx++)
            result[idx] = this.data[(this.start + start + idx) % this.size];
        return result;
    }
}

export default CircularArray;
