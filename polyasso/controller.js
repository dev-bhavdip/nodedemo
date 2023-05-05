const models = require("./models");
const com = models.comment;
const vid = models.videos;
const pht = models.photos;

async function data_table(req, res, next) {
  const { draw, start, length, order, search, columns } = req.query;
  console.log("draw from data table", draw);
  await com
    .findAll({
      include: [
        { model: vid, as: "v_id" },
        { model: pht, as: "img_id" },
      ],
    })
    .then((data) => {
      let db = JSON.stringify(data);
    //   console.log("json data",db);
      res.json({
        draw: draw,
        recordsTotal: data.count,
        recordsFiltered: data.count,
        data: data.rows,
        data: data,
      });
    })
    .catch((err) => {
      console.log("Error while find getdata  : ", err);
    });
}
module.exports = { data_table };
