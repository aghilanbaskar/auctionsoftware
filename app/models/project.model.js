const sql = require("./db.js");
const util = require('util');


// constructor
const Project = function() {
};


Project.getAll = async (offset, sort, result) => {
    let orderby = '';
    switch (sort) {
        case 'recent':
            orderby= 'ORDER BY pu.project_id ASC';
            break;
        case 'category':
            orderby= 'ORDER BY C.category_name ASC';
            break;
        case 'username':
            orderby= 'ORDER BY pu.username ASC';
        break;
        case 'title':
            orderby= 'ORDER BY pu.project_title ASC';
        break;
        default:
            orderby= 'ORDER BY pu.project_id DESC';
            break;
    }
    const query = util.promisify(sql.query).bind(sql);
    let data = await query(`SELECT pu.project_id, pu.project_title, pu.username, c.category_name FROM  (
        SELECT p.project_id, p.project_title, u.username, p.cid FROM projects p , users u WHERE p.user_id = u.user_id
    ) as pu
    LEFT JOIN categories c ON pu.cid = c.cid ${orderby}  LIMIT 2 OFFSET ${offset}`);
    let total = await query(`SELECT Count(*) as total FROM projects`);
    result(null, {data, total: total[0].total});
};


module.exports = Project;