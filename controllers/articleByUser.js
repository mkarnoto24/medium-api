const Category = require('../models').categories  //import categories models 
const Article = require('../models').articles //import articles models 
const User = require('../models').users //import users models 
exports.add = (req, res) => {
    Article.create(
        req.body,
        { where: { author_id: req.param.id } }
    ).then(article => {
        res.send({
            message: "success",
            article
        })
    }).catch(err => res.send(err))

}
// exports.update = (req, res) => {
//     Article.update(
//         req.body,
//         { where: { id: req.params.id } }
//     ).then(article => {
//         res.send({
//             message: "success",
//             article
//         })
//     })
// }
// exports.delete = (req, res) => {

//     Article.destroy({ where: { id: req.params.id } }).then(id => {
//         res.send({
//             message: "success",
//             id
//         })
//     })
// }