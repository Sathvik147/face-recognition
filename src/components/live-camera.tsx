import { useRef, useEffect } from "react";
import "../App.css";
import * as faceapi from "face-api.js";

function LiveCamera() {
    const videoRef = useRef<any>();
    const canvasRef = useRef<any>();

    // LOAD FROM USEEFFECT
    useEffect(() => {
        startVideo();
        videoRef && loadModels();
    }, []);

    // OPEN YOU FACE WEBCAM
    const startVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((currentStream) => {
                videoRef.current.srcObject = currentStream;
            })
            .catch(() => {
                // console.log(err);
            });
    };
    // LOAD MODELS FROM FACE API

    const loadModels = () => {
        Promise.all([
            // THIS FOR FACE DETECT AND LOAD FROM YOU PUBLIC/MODELS DIRECTORY
            faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
            faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
            faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
            faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        ]).then(() => {
            faceMyDetect();
        });
    };

    const faceMyDetect = () => {
        setInterval(async () => {
            // console.log(videoRef.current);
            const detections = await faceapi
                .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions();
            // console.log(detections);
            // DRAW YOU FACE IN WEBCAM
            canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
                videoRef.current
            );
            faceapi.matchDimensions(canvasRef.current, {
                width: 940,
                height: 650,
            });

            const resized = faceapi.resizeResults(detections, {
                width: 940,
                height: 650,
            });

            faceapi.draw.drawDetections(canvasRef.current, resized);
            faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
            faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
        }, 1000);
    };

    return (

        <>
            <h1 className="text-black  text-center font-bold">Live Face Detection App</h1>
            <div className="w-full h-screen  flex justify-center gap-10 flex-col items-center">

                <div className="appvide">
                    <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
                </div>
                <canvas ref={canvasRef} width="940" height="650" className="appcanvas" />
            </div>
        </>

    );
}

export default LiveCamera;
