import DBF from './dbFactory'

export default DBF.context;

let prefix = ''
if (__LOCAL__) {
    prefix = ''
}
if (__PRO__) {
    prefix = ''
}
//
// DBF.create('Analyse', {
//     getUserDate: {
//         url: prefix + '/a',
//         method: 'GET'
//     },
// })
