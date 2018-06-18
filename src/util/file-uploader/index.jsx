import React from 'react';
import FileUpload from './react-fileupload.jsx';


class FileUploader extends React.Component {
    render(){
        const options = {
            baseUrl : '/manage/product/upload.do',
            fileFieldName: 'upload_file',
            dataType: 'json',
            chooseAndUpload: true,
            uploadSuccess : (res) => {
                console.log(res);
            },
            uploadError : (err) => {
                console.log(err);
            }
        }

        return (
            <FileUpload options={options}>
                <button ref='chooseAndUpload'>choose</button>
                {/*<button ref='uploadBtn'>upload</button>*/}
            </FileUpload>
        )
    };
}

export default FileUploader;