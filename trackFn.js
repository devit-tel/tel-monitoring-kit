const {startSpan, getParentSpan, tracer} = require('jaeger-client-utility').default

module.exports = function(config){
    const { logInput, logOutput } = config
    return function(target){
        return function(){
            const span = startSpan(target.name, {childOf: arguments.callee.caller.__span})
            target.__span = span
            logInput && span.setTag('input', arguments)
            span.setTag('fn.name', target.name)
            span.setTag('caller.name', arguments.callee.caller.name)
            span.setOperationName(target.name)
            let error
            try{
                const result = target.apply(this, arguments)
                logOutput && span.setTag('output', result)
                return result
            }catch(e){
                error = e
                span.setTag('error', true)
                span.setTag('error.message', e.message)
                span.setTag('error.kind', e.name)
                span.setTag('stack', e.stack)
            }finally{
                span.finish()
                if(error) throw error
            }
        } 
    }
}