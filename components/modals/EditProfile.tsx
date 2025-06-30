import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner';

export default function EditProfile({userId,userData}:{userId:string,userData:{username:string,name:string,image_url:string}}) {
    const router = useRouter();
  const [username,setUsername]=useState(userData.username)
  const [name,setName]=useState(userData.name)
  const [image_url,setImage_url]=useState(userData.image_url)
  
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading,setLoading]=useState(true);
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !userId) return;

        setPreview(URL.createObjectURL(file));

        try {
        setUploading(true);
        const fd = new FormData();
        fd.append("file", file);
        fd.append("userId", userId); 

        const res = await fetch("/api/upload", {
            method: "POST",
            body: fd,
        });

        if (!res.ok) throw new Error("Upload failed");

        const { url } = await res.json();
        setImage_url(url);
        // toast.success("Image uploaded!");
        } catch (err) {
        console.error(err);
        toast.error("Upload failed");
        } finally {
        setUploading(false);
        }
    };
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    
        try {
            const data={username: username,name: name,imageUrl: image_url}
            const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL_2}/onboarding/${userId}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }
            );
    
            if (response.ok) {
            toast.success("updated");
            router.push("/profile");
            } else {
            const txt = await response.text();
            toast.error(txt || "updating failed");
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        }
    };
    
  return (
    <div className="bg-mainbg-2">
      <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
        <div className="w-ful rounded-lg shadow dark:border sm:max-w-md xl:p-0 bg-mainbg-1 w-120">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Edit profile
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="avatar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Profile picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="avatar"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 h-10 p-2"
                />
                {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
                {preview && !uploading && (
                  <img src={preview} alt="preview" className="mt-2 h-24 w-24 object-cover rounded-full" />
                )}
              </div>
              
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e)=>{setUsername(e.target.value)}}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <button
                type="submit"
                disabled={uploading}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
