/*
 * @Description: 
 * @Author: LI NING
 * @Date: 2021-04-09 16:09:57
 * @LastEditTime: 2021-04-13 18:21:24
 * @LastEditors:  
 */
const Service = require('egg').Service;
const Sequelize = require('sequelize');
const FastScanner = require('fastscan');   //引入敏感词插件
const fs = require('fs')
var Sensitive = fs.readFileSync('app/utils/words.test')   //引入敏感词词库
Sensitive = Sensitive.toString().split("\n")
var scanner = new FastScanner(Sensitive)     //敏感词库接入
var options = { quick: true, longest: false }   //敏感词设置   quick 选项表示快速模式，匹配到一个就立即返回 ,longest 表示最长模式，同一个位置出现多个词汇(中国、中国人)，选择最长的一个(中国人)

const Op = Sequelize.Op;
class HomeService extends Service {
    async todoList(param) {
        const { ctx } = this
        const openid = ctx.get('token');
        let data = ctx.model.Todos.findAll({
            where: {
                openid
            },
            order: [['id', 'desc']],
        });
        return data;
    }
    async create(param) {
        const { ctx } = this
        param.openid = ctx.get('token');

        var offWords = scanner.search(param.content, options)    //敏感词检测
        if (offWords.length > 0) {
            throw new Error('文字内容含有敏感词,请重新输入!');
        }
        const data = await ctx.model.Todos.create(param);
        return data;
    }
    async update(param) {
        const { ctx } = this
        let { id } = param
        if (param.content) {
            var offWords = scanner.search(param.content, options)    //敏感词检测
            if (offWords.length > 0) {
                throw new Error('文字内容含有敏感词,请重新输入!');
            }
        }
        const data = await ctx.model.Todos.update(param, {
            where: { id }
        });
        if (!data) {
            throw new Error('404');
        }
        return 'ok';
    }
    async remove(param) {
        const { ctx } = this
        let { id } = param
        const data = await ctx.model.Todos.destroy({
            where: { id }
        });
        if (!data) {
            throw new Error('404');
        }
        return 'ok';
    }
    async sendMsg(param) {
        const { ctx } = this
        const list = await ctx.model.SendMsg.findAll({
            // order: [['endTime', 'desc']],
            attributes: [Sequelize.col('todo.openid'), Sequelize.col('todo.content'), Sequelize.col('todo.endTime'), 'id', 'todoId'],  //数据打平后要输出的字段 
            include: [{
                model: ctx.model.Todos,
                attributes: []
            }],
            raw: true,    //数据打平属性
        });
        const urlStr = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxbccf1273eb88b291&secret=10ebf8ec1f891180713899940602d5f7'
        const tokenRes = await ctx.curl(urlStr);
        let access_token = JSON.parse(tokenRes.data).access_token
        for (let item of list) {
            var data = {
                touser: item.openid,	//要通知的用户的openID
                template_id: "RScY5UEMogFbX3c5C5w9cvVJ8Qj8vDEmvpOjAV-O4HU",	//模板id
                data: {	//要通知的模板数据
                    "thing5": { "value": "标题" },
                    "date9": { "value": "2020-01-01 08:10:00" },
                    "thing8": { "value": "紧急且重要" },
                    "thing2": { "value": "发货通知成功" }
                }
            };
            const res = await ctx.curl(`https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${access_token}`, {
                data,
                method: 'POST',
                dataType: 'json',
                contentType: 'json',
            });
            console.log(res)
        }
        return list;
    }
}

module.exports = HomeService
