import { getAll } from './rc';
import download from 'download-git-repo'; // 从Github,Gitlab下载远程仓库到本地
import { TEMPLATE } from './constants';

export const downloadLocal = async(template, projectName) => {
    // console.log(`templateName: ${templateName}; projectName: ${projectName}`);
    let config = await getAll();
    // config => {}
    // let api = `${config.registry}/${templateName}`;
    // 这里我把项目模板硬编码了, 这里后续要改的
    let api = `github:${TEMPLATE[template.kind - 1].user}/${TEMPLATE[template.kind - 1].projectName}`; 
    return new Promise((reslove, reject) => {
        // console.log(`api: ${api}`);
        // download这个函数会帮我们重命名项目
        download(api, projectName, (err) => {
            if(err) {
                reject(err);
            }
            reslove();
        });
    });
}
