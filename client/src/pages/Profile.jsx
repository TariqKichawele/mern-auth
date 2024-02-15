import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input 
          type="file" 
          hidden 
          accept="image/*" 
         />
         <img 
          src={currentUser.profilePicture} 
          alt="profile" 
          className="w-24 h-24 self-center cursor-pointer rounded-full object-cover mt-2"
         />
        <input 
          type="text" 
          placeholder="Username"
          id="username" 
          className="bg-slate-100 rounded-lg p-3" 
          defaultValue={currentUser.username}
        />
        <input 
          type="email" 
          placeholder="Email"
          id="email" 
          className="bg-slate-100 rounded-lg p-3" 
          defaultValue={currentUser.email}
        />
        <input 
          type="password" 
          placeholder="Password"
          id="password" 
          className="bg-slate-100 rounded-lg p-3"
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
