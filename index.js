const wrapModule = require('./wrapModule')
const jaegerClient = require('jaeger-client-utility')
const trackFn = require('./trackFn')

module.exports = {
    wrapModule,
    trackFn,
    initJaegerClient: jaegerClient.default.init,
    injectJaeger: jaegerClient.default.inject,
    startJaegerSpan: jaegerClient.default.startSpan,
    getJaegerTracer: jaegerClient.default.tracer,
}