import { getAll } from './rc';
import download from 'download-git-repo'; // 从Github,Gitlab下载远程仓库到本地

export const downloadLocal = async(templateName, projectName) => {
    console.log(`templateName: ${templateName}; projectName: ${projectName}`);
    let config = await getAll();
    // config => {}
    // let api = `${config.registry}/${templateName}`;
    let api = `github:yewenjunfighting/hello_world`;
    return new Promise((reslove, reject) => {
        console.log(`api: ${api}`);
        download(api, projectName, (err) => {
            if(err) {
                reject(err);
            }
            reslove();
        });
    });
}
