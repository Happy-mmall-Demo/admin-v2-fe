import React from 'react';
import Simditor from 'simditor';
import 'simditor/styles/simditor.scss';
import './index.scss';

class RichEditor extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.loadEditor();
    }

    componentWillReceiveProps(nextProps) {
        // let detaiChange = this.props.detail != nextProps.detail;
        //
        // if(!detaiChange){
        //     return;
        // }
        // if(this.props.defaultDetail !== nextProps.detail) {
        //     this.simditor.setValue(nextProps.defaultValue);
        // }

        if(this.props.defaultDetail !== nextProps.defaultDetail) {
            this.simditor.setValue(nextProps.defaultDetail);
        }
    }

    loadEditor() {
        let element = this.refs['textarea'];
        this.simditor = new Simditor({
            textarea: $(element),
            defaultValue: this.props.placeholder || 'Please input something...',
            upload: {
                url: '/manage/product/richtext_img_upload.do',
                defaultImage: '',
                fileKey: 'upload_file'
            }
        })
        this.bindEditorEvent();
    }

    bindEditorEvent(){
        this.simditor.on('valuechanged', e => {
            this.props.onValueChange(this.simditor.getValue());
        })
    }

    render(){
        return (
            <div className = 'rich-editor'>
                <textarea ref="textarea">

                </textarea>
            </div>
        )
    };
}


export default RichEditor;