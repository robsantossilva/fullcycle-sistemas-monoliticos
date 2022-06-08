
var globalObject = {
    name: function(sobrenome){
        return 'Robson ' + sobrenome;
    }
}

var functionString = `(async function evalFuncTest(name=''){
    return globalObject.name('Silva ' + name);
})`;

var func = eval(functionString);

func('Silva').then(v => console.log(v));