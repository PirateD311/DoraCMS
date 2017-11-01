/**
 * Created by Administrator on 2017/4/15.
 * 参与会议人数
 */
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var moment = require('moment')


var PeopleSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },
    name: String,
    company:String,
    duties:String,
    phone:String,
    email:String,
    date:Number,
});



PeopleSchema.path('date').get(function (v) {
    return moment(v).format("YYYY-MM-DD HH:mm:ss");
});

var People = mongoose.model("People", PeopleSchema);
module.exports = People;

