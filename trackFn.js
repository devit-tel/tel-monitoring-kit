const {startSpan, getParentSpan, tracer} = require('jaeger-client-utility').default

module.exports = function(config){
    const {  } = config
    return function(target){
        return function(){
            console.log('caller ', arguments.callee.caller.__span)
            const span = startSpan(target.name, {childOf: arguments.callee.caller.__span})
            target.__span = span
            const result = target.call(this, arguments)
            span.finish()
            return result
        } 
    }
}