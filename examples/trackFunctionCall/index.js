require('dotenv').config()
const {initJaegerClient, startJaegerSpan, trackFn} = require('../..')

initJaegerClient()

let trackedFunc1 = trackFn({})(
    function kkkkkk() {
        for(let i = 0; i< 5000; i++){console.log('a')}
        console.log('my name is 1')
        let a = df
    }
)
let trackedFunc2 = trackFn({})(
    function trackedFunc2() {
        for(let i = 0; i< 6000; i++){console.log('a')}
        trackedFunc1()
        for(let i = 0; i< 6000; i++){console.log('a')}
    }
)
let trackedFunc3 = trackFn({})(
    function trackedFunc3() {
        for(let i = 0; i< 7000; i++){console.log('a')}
        trackedFunc2()
        for(let i = 0; i< 10000; i++){console.log('a')}
    }
)
let trackedFunc4 = trackFn({})(
    function trackedFunc4() {
        trackedFunc3()
        for(let i = 0; i< 2000; i++){console.log('a')}
    }
)

let trackedFunc = trackFn({logInput: true, logOutput: true})(
    function firstFunction(a, b) {
        trackedFunc4()
        for(let i = 0; i< 3000; i++){console.log('a')}
        return a+b
    }
)

try{

    console.log('result', trackedFunc(1, 4))
}catch(e){
    
}