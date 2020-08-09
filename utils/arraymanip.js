function randomise(max) {
    return(Math.floor(Math.random() * max));
}


module.exports.questionJumble = (x, max=10) => {
    var a = [], b;
    a.push(randomise(max));
    while( a.length < x){
        b = randomise(max);
        for(var i=0; i<a.length; i++){
            if(a[i] === b){
                b = randomise(max);
                i=-1;
            }
        }
        a.push(b)
    }
    return a;
}