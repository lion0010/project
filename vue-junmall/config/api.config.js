const isProdMode = Object.is(process.env.NODE_ENV, 'development')

console.log('--------------------------------------')
console.log(process.env.NODE_ENV)
console.log(isProdMode)
module.exports = {
  baseUrl: isProdMode ? 'api/' : 'http://wanlu.lao7.site/api/' 
}