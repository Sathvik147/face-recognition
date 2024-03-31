import { useEffect, useState } from 'react'
import NewPost from './new-post';

export default function ImageUpload() {
    // eslint-disable-next-line no-unused-vars
    const [file, setFile] = useState<any>();
    const [image, setImage] = useState<any>();

    useEffect(() => {

        const getImage = () => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                setImage({
                    url: img.src,
                    width: img.width,
                    height: img.height,
                });
            };
        };

        file && getImage();
    }, [file]);
    return (
        <>

            <div>
                <h1 className='text-5xl text-black text-center font-bold my-6'>Face Detection Using Images</h1>
                {image ? (
                    <NewPost image={image} />
                ) : (
                    <div className="newPostCard ">
                        <div className="addPost">

                            <div className="postForm">

                                <label htmlFor="file">
                                    <img
                                        className="addImg"
                                        src="https://cdn.icon-icons.com/icons2/564/PNG/512/Add_Image_icon-icons.com_54218.png"
                                        alt=""
                                    />
                                    <span className='text-black ml-2'>Choose Image</span>
                                </label>
                                <input
                                    onChange={(e: any) => setFile(e.target.files[0])}
                                    id="file"
                                    style={{ display: "none" }}
                                    type="file"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
