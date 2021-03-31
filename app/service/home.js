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
}

module.exports = HomeService
