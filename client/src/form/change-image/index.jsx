import { useEffect, useState } from "react";
import { Message, Uploader, useToaster } from "rsuite";
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import RequestList from "../../API/RequestList";
import {useFetching} from "../../hooks/useFetching"
import { useBase64 } from "../../hooks/useArrayBufferToBase64";


const ChangeImage = ({image, callback}) => {
    const toaster = useToaster();
    const [fileInfo, setFileInfo] = useState('');

    const [fetchAdd, isAddLoading, addError] = useFetching(async (e) => {
        callback()
        if(!image.id) {
            await RequestList.addElem('image_user', e)
            return;
        }
        await RequestList.putById(image.id, 'image_user', e)
    })

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
    
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
    
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    
    const uploadImage = async (event) => {
        const base64 = await convertBase64(event);
        setFileInfo(base64)
        fetchAdd({name: event.name, type: event.type, picByte: base64})
    };

    useEffect(() => {
        setFileInfo(useBase64(image.picByte.data, image.type))
    }, [])

    return (
        <Uploader
            fileListVisible={false}
            autoUpload={false}
            listType='picture'
            onChange={file => {
                uploadImage(file[file.length - 1].blobFile)
                toaster.push(<Message type="success">Картинка изменена зайдите еще раз</Message>);
            }}
        >
            <button style={{ width: 150, height: 150 }}>
                {fileInfo ? (
                    <img src={fileInfo} width="100%" height="100%" />
                    ) : (
                    <AvatarIcon style={{ fontSize: 80 }} />
                )}
            </button>
        </Uploader>
    );
}

export default ChangeImage