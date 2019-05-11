const wrapModule = require('./wrapModule')
const jaegerClient = require('jaeger-client-utility')
const trackFn = require('./trackFn')

module.exports = {
    wrapModule,
    trackFn,
    initJaegerClient: function(){
        const originameConfig = arguments[0] || {}
        const originameOptions = arguments[1] || {}
        const detectedServiceName = process.env.LOGGING_SERVICE || process.env.SERVICE_NAME || process.env.PROJECT_NAME
        const detectedNodeEnv = process.env.NODE_ENV || process.env.APP_ENV
        const config = {
            serviceName: detectedServiceName,
            ...originameConfig
        }
        const options = {
            'node.env': detectedNodeEnv,
            'service.name': detectedServiceName,
            ...originameOptions
        }
        console.info('initial jaeger client', config, options)
        jaegerClient.default.init(config, options)
    },
    injectJaeger: jaegerClient.default.inject,
    startJaegerSpan: jaegerClient.default.startSpan,
    getJaegerParentSpan: jaegerClient.default.getParentSpan,
    getJaegerTracer: jaegerClient.default.tracer,
}