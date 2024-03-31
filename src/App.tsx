import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import LiveCamera from "./components/live-camera";
import Navbar from "./components/navbar";
import ImageUpload from "./components/image-upload";

export default function App() {
  
  return (
    <>
      <SignedOut>
        <div className="flex h-screen w-full justify-center items-center">
          <SignIn />
        </div>
      </SignedOut>
      <SignedIn>
        <Navbar />
        <LiveCamera />
        <ImageUpload />
      </SignedIn>
    </>
  )
}