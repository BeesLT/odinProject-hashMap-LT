class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
    }

    hash(key) {
        let hash = 0;
        const prime = 31;
        for (let i = 0; i < key.length; i++) {
            hash = (prime * hash + key.charCodeAt(i)) % this.capacity;
        }
        return hash;
    }

    set(key, value) {
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Out of bounds access");
        }

        if (!this.buckets[index]) this.buckets[index] = [];

        const bucket = this.buckets[index];
        const existing = bucket.find(pair => pair[0] === key);

        if (existing) {
            existing[1] = value;
        } else {
            bucket.push([key, value]);
        }

        if (this.length() / this.capacity > this.loadFactor) {
            this.resize();
        }
    }

    get(key) {
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Out of bounds access");
        }
        const bucket = this.buckets[index];
        if (!bucket) return null;

        const pair = bucket.find(pair => pair[0] === key);
        return pair ? pair[1] : null;
    }

    remove(key) {
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Out of bounds access");
        }
        const bucket = this.buckets[index];
        if (!bucket) return false;

        const pair = bucket.find(pair => pair[0] === key);
        if (pair) {
            bucket.splice(bucket.indexOf(pair), 1);
            return true;
        }
        return false;
    }

    clear() {
        this.buckets = new Array(this.capacity);
    }

    values() {
        const values = [];
        
        for (const bucket of this.buckets) {
            if (bucket) {
                for (const pair of bucket) {
                    values.push(pair[1]);
                }
            }
        }
        return values;
    }

    has(key) {
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Out of bounds access");
        }
        const bucket = this.buckets[index];
        if (!bucket) return false;

        return bucket.some(pair => pair[0] === key);
    }

    length() {
        let count = 0;
        for (const bucket of this.buckets) {
            if (bucket) {
                count += bucket.length;
            }
        }
        return count;
    }

    keys() {
        const keys = [];
        for (const bucket of this.buckets) {
            if (bucket) {
                for (const pair of bucket) {
                    keys.push(pair[0]);
                }
            }
        }
        return keys;
    }

    entries() {
        const entries = [];
        for (const bucket of this.buckets) {
            if (bucket) {
                for (const pair of bucket) {
                    entries.push(pair);
                }
            }
        }
        return entries;
    }
}

module.exports = { HashMap };