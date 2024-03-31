import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import "../App.css"
const NewPost = ({ image }: any) => {
    const { url, width, height } = image;
    const [faces, setFaces] = useState<any>([]);
    const [friends, setFriends] = useState<any>([]);

    const imgRef = useRef<any>();
    const canvasRef = useRef<any>();

    const handleImage = async () => {
        const detections: any = await faceapi.detectAllFaces(
            imgRef.current,
            new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks()
            .withFaceExpressions();;
        console.log(detections);
        setFaces(detections);


        // const detections = await faceapi
        // .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())

    };

    const enter = () => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.lineWidth = 5;
        ctx.strokeStyle = "yellow";
        faces.map((face: any) => ctx.strokeRect(...face));
    };

    useEffect(() => {
        const loadModels = () => {
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                faceapi.nets.faceExpressionNet.loadFromUri("/models"),

                faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
            ])
                .then(handleImage)
                .catch((e) => console.log(e));
        };

        imgRef.current && loadModels();
    }, []);

    const addFriend = (e: any) => {
        setFriends((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    console.log(friends);
    return (
        <div className="w-full  flex justify-center items-center">
            <div className="left w-full flex items-center justify-center" style={{ width, height }}>
                <img ref={imgRef} crossOrigin="anonymous" src={url} alt="" />
                <canvas
                    onMouseEnter={enter}
                    ref={canvasRef}
                    width={width}
                    height={height}
                />

                {faces.map((face: any, i: any) => (
                    // face.detection._box._x
                    // face.detection._box._x
                    // face.detection._box._height
                    // face.detection._box._width
                    <div
                        // value={Math.round(Math.random() * 100)}
                        // disabled
                        // name={`input${i}`}
                        style={{ left: face.detection._box._x, top: face.detection._box._y + face[3] + 5, height: face.detection._box._height, width: face.detection._box._width }}
                        // placeholder="Tag a friend"
                        key={i}
                        className="friendInput bg-black/60 text-black flex flex-col justify-center items-center"
                        onChange={addFriend}
                    >
                        <p className="text-white">Angry: {Math.round(face.expressions.angry * 100 / 100)}  </p>
                        <p className="text-white">Happy:{Math.round(face.expressions.happy * 100 / 100)} </p>
                        <p className="text-white">Sad:{Math.round(face.expressions.sad * 100 / 100)}  </p>
                        <p className="text-white">Neutral:{Math.round(face.expressions.neutral * 100 / 100)} </p>
                    </div>
                ))}
            </div>
            {/* <div className="right">
                <h1 className="text-black">Share your post</h1>
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    className="rightInput"
                />
                {friends && (
                    <span className="friends">
                        with <span className="name text-black">{Object.values(friends) + " "}</span>
                    </span>
                )}
                <button className="rightButton">Send</button>
            </div> */}
        </div>
    );
};

export default NewPost;