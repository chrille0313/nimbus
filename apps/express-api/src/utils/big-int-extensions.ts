BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());
    return Number.isNaN(int) ? this.toString() : int;
  };