import React, { useState } from "react";
import axios from "axios";
import { Button } from "../ui/ui/button";
import swal from "sweetalert";

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No IMG");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        // To make sure that the file is uploaded to Pinata:
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `95b9c3947b3cef05fa9c`,
            pinata_secret_Api_key: `157b87552d80cab4db17b8e5afec63907effa3e692fe2aef41b7246dcc0b204d`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs://${resFile.data.IpfsHash}`;
        contract.add(account, ImgHash);
        swal("Successfully uploaded the image");
        // console.log("Done");
        setFileName("No IMG");
      } catch (e) {
        swal("Unable to upload image to Pinata");
      }
    }
  };

  const retrieveFile = (e) => {
    // Files array of files obj
    const data = e.target.files[0];
    console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center">
      <form action="" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <input
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100 "
            type="file"
            disabled={!account}
            id="file-upload"
            name="data"
            onChange={retrieveFile}
          />
          <Button
            className="w-18 h-10"
            variant="share"
            type="submit"
            disabled={!file}
          >
            Upload
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FileUpload;
