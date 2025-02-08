import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "~~/components/ui/button";

export default function UploadMusic() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/upload");

      xhr.upload.onprogress = event => {
        if (event.lengthComputable) {
          setProgress(Math.round((event.loaded / event.total) * 100));
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          alert("Upload successful");
        } else {
          console.error("Upload failed");
        }
        setUploading(false);
        setProgress(0);
      };

      xhr.onerror = () => {
        console.error("Upload error");
        setUploading(false);
        setProgress(0);
      };

      xhr.send(formData);
    } catch (error) {
      console.error("Upload error", error);
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="p-4 border rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Upload Your Music</h2>
      {/* <Input type="file" accept="audio/*" onChange={handleFileChange} /> */}
      <input type="file" accept="audio/*" className="file-input file-input-bordered w-full" />
      {file && <p className="mt-2 text-sm">Selected: {file.name}</p>}
      <Button className="mt-4 w-full" onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
        <Upload className="ml-2" size={16} />
      </Button>
      {/* {uploading && <Progress className="mt-2" value={progress} />} */}
      {uploading && <progress className="progress progress-primary w-full mt-2" value={progress} max="100"></progress>}
    </div>
  );
}
