const {initJaegerClient, startJaegerSpan, trackFn} = require('../..')

initJaegerClient({serviceName: 'tel-monitoring-kit-example'})

let trackedFunc1 = trackFn({})(
    function kkkkkk() {
        for(let i; i< 10000; i++){}
        console.log('my name is 1')
    }
)
let trackedFunc2 = trackFn({})(
    function trackedFunc2() {
        for(let i; i< 10000; i++){}
        trackedFunc1()
    }
)
let trackedFunc3 = trackFn({})(
    function trackedFunc3() {
        trackedFunc2()
    }
)
let trackedFunc4 = trackFn({})(
    function trackedFunc4() {
        trackedFunc3()
    }
)

let trackedFunc = trackFn({})(
    function kkkkkk() {
        trackedFunc4()
    }
)

trackedFunc()