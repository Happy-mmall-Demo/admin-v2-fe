import React from 'react';
import FileUpload from './react-fileupload.jsx';


class FileUploader extends React.Component {
    render(){
        const options = {
            baseUrl : '/manage/product/upload.do',
            fileFieldName: 'upload_file',
            dataType: 'json',
            chooseAndUpload: true,
            uploadSuccess : (res) => this.props.onSuccess(res.data),
            uploadError :(err) => this.props.onError(err.message || 'Upload Failed')
        }

        return (
            <FileUpload options={options}>
                <button className="btn btn-md" ref='chooseAndUpload' >choose</button>
                {/*<button ref='uploadBtn'>upload</button>*/}
            </FileUpload>
        )
    };
}

export default FileUploader;