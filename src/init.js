// init命令
// 当用户执行init命令后, 向用户提出问题
// 接收用户的输入并进行相应的处理
// 命令格式 ywj init template-name project-name
import { downloadLocal } from './utils/get'; // 引入下载模板的函数
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import symbol from 'log-symbols'; // Colored symbols for various log levels

let init = async(templateName, projectName) => {
    // 如果当前目录下没有同名的项目
    if(!fs.existsSync(projectName)) {
        // 命令行交互
        inquirer.prompt([
            {
                name: 'description',
                message: 'Please enter the project description: '
            },
            {
                name: 'author',
                message: 'Please enter the author name: '
            }
        ]).then(async (answer) => {
            // 下载模板, 选择模板
            // 通过配置文件, 获取模板信息
            // 显示正在加载的效果
            let loading = ora('downloading template ...');
            loading.start();
            // console.log(templateName, projectName);
            downloadLocal(templateName, projectName).then(() => {
                // 模板下载成功
                loading.succeed();
                const fileName = `${projectName}/package.json`;
                console.log(`fileName: ${fileName}`);
                if(fs.existsSync(fileName)) {
                    // 读取package.json文件,并设置它的name, author, description字段
                    const data = fs.readFileSync(fileName).toString();
                    let json = JSON.parse(data);
                    json.name = projectName;
                    json.author = answer.author;
                    json.description = answer.description;
                    // 修改项目文件夹中的package.json文件
                    // 为了package.json文件的可读性,字符串化的时候写入了\t
                    // 上面的操作就是: 当模板下载完了,读取项目根目录下的package.json
                    // 读取,写入用户输入的数据, 覆盖原来的package.json文件
                    fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
                    console.log(symbol.success, chalk.green('Project initialization finished!'));
                }else {
                    console.log('该项目没有package.json文件');
                }
            }).catch(() => {
                loading.fail()
            })
        });
    }else {
        // 项目已存在
        console.log(symbol.error, chalk.red('The project already exists'));
    }
}

module.exports = init;