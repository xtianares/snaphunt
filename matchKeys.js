Array.prototype.diff = function(arr2) {
  var matchedKeys = [];
  // this.sort();
  // arr2.sort();
  for(var i = 0; i < this.length; i += 1) {
      if(arr2.indexOf(this[i]) > -1){
          matchedKeys.push(this[i]);
      }
  }
  return matchedKeys;
};

var huntKeys = ["chair", "desk", "people", "computer", "telephone"];
var snapKeys = ["table", "desk", "computer", "clock", "window"];

console.log(huntKeys.diff(snapKeys));


