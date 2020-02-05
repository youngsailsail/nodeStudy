process.nextTick(function() {
    console.log("nextTick callback!");
});
function name(params) {
    console.log("nextTick was set!");
    console.log(params);
    console.log(222);
}
name(444);
console.log(3333);
console.log(444);
console.log(5555);
