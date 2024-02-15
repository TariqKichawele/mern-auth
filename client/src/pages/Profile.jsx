import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { app } from "../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [ image, setImage ] = useState(undefined);
  const [ imagePercent, setImagePercent ] = useState(0);
  const [ imageError, setImageError ] = useState(false);
  const [ formData, setFormData ] = useState({});
  const filRef = useRef(null);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }  

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      () => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input 
          type="file" 
          hidden 
          accept="image/*" 
          ref={filRef}
          onChange={(e) => setImage(e.target.files[0])}
         />
         <img 
          src={formData.profilePicture || currentUser.profilePicture} 
          alt="profile" 
          className="w-24 h-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => filRef.current.click()}
         />
         <p className="text-sm self-center">
          {
            imageError ? (
              <span className="text-red-700">
                Error uplading image (file size must be less than 2MB)
              </span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className="text-slate-700">
                {`Uploading: ${imagePercent}%`}
              </span>
            ) : imagePercent === 100 ? (
              <span className="text-green-700">
                Image Uploaded successfully
              </span>
            ) : (
              ''
            )
          }
         </p>
        <input 
          type="text" 
          placeholder="Username"
          id="username" 
          className="bg-slate-100 rounded-lg p-3" 
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input 
          type="email" 
          placeholder="Email"
          id="email" 
          className="bg-slate-100 rounded-lg p-3" 
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input 
          type="password" 
          placeholder="Password"
          id="password" 
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button 
          type="submit" 
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      <p>{error && 'Something went wrong'}</p>
    </div>
  )
}
