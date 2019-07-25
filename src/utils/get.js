import { getAll } from './rc';
import downloadGit from 'download-git-repo'; // 从Github,Gitlab下载远程仓库到本地

export const downloadLocal = async(templateName, projectName) => {
    let config = await getAll();
    let api = `${config.registry}/${templateName}`;
    return new Promise((reslove, reject) => {
        //
        downloadGit(api, projectName, (err) => {
            if(err) {
                reject(err);
            }
            reslove();
        });
    });
}
