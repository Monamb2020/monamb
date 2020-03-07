class Counter {
    constructor(count){
        this._count = count;
    }
    getCounter(){
        this._count++;
        return this._count;
    }
}

module.exports = Counter;