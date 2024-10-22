import React, {useEffect} from "react";
import { Edit2 } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useUploadPublicPhoto } from "./../../hooks/useFetchPublicPhoto";
import { LoadingOverlay } from "./Loading";

const MAX_FILE_SIZE = 500 * 1024;


const PublicPhotoUpload = () => {
  const { userId } = useAuth();
  const formType = localStorage.getItem('formType')

  console.log(formType);

//   const { imageUrl, isLoading, error, fetchPhoto } = useFetchPublicPhoto(userId);
  const { uploadPublicPhoto, isUploading, uploadError } = useUploadPublicPhoto(userId);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // CHECK FILE SIZE BEFORE UPLOADING
    if (selectedFile.size > MAX_FILE_SIZE) {
      alert("File size exceeds the maximum allowed (500 KB).");
      return;
    }

    const newimageUrl = await uploadPublicPhoto(selectedFile, "public", formType);
    // if (newimageUrl) {
    //   fetchPhoto(formType);
    // }
  };

//   useEffect(() => {
//     if (imageUrl) {
//       console.log("Photo URL updated:", imageUrl);
//     }
//   }, [imageUrl]);

//   if (isLoading) {
//     return <LoadingOverlay message="We are fetching your profile picture." />;
//   }

  if (isUploading) {
    return <LoadingOverlay message="We are uploading your profile picture." />;
  }

  if (!userId) {
    return (
      <div className="text-red-500">
        User ID not found. Please log in again.
      </div>
    );
  }

  return (
    <div className="relative">
      <img
        // src={`${imageUrl || ""}?t=${Date.now()}`} // Cache busting
        alt="Public photo"
        className="w-full h-[400px] object-cover"
        onError={(e) => {
          e.target.src = "/default-profile.jpg";
        }}
      />
      <label
        htmlFor="public"
        className="absolute bottom-0 right-0 bg-white p-1 shadow-md cursor-pointer"
      >
        <Edit2 size={16} />
      </label>
      <input
        id="public"
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
          <div className="loader"></div>
        </div>
      )}
      {/* {(error || uploadError) && (
        <div className="absolute inset-x-0 -bottom-6 text-red-500 text-xs text-center">
          {error || uploadError}
        </div>
      )} */}
    </div>
  );
};

export default PublicPhotoUpload;
