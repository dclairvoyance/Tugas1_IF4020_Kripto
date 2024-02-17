import { useState } from "react";
import {
  MdLockOutline,
  MdLockOpen,
  MdFileDownload,
  MdFileUpload,
} from "react-icons/md";

const Viginere = () => {
  const [variant, setVariant] = useState("standard");
  const [format, setFormat] = useState("text");
  const [fileName, setFileName] = useState("");

  const handleVariant = (variant) => {
    setVariant(variant);
  };
  const handleFormat = (format) => {
    setFormat(format);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
  };

  return (
    <>
      <div className="p-2 bg-primary_1 rounded-md">
        {/* variant picker */}
        <div className="flex justify-center border-b border-primary_2 mb-2">
          <button
            className={`${
              variant === "standard"
                ? "text-secondary border-b-secondary"
                : "text-white"
            } mx-1 p-1 rounded-md`}
            onClick={() => handleVariant("standard")}
          >
            Standard
          </button>
          <button
            className={`${
              variant === "autokey"
                ? "text-secondary border-b-secondary"
                : "text-white"
            } mx-1 p-1 rounded-md`}
            onClick={() => handleVariant("autokey")}
          >
            Autokey
          </button>
          <button
            className={`${
              variant === "extended"
                ? "text-secondary border-b-secondary"
                : "text-white"
            } mx-1 p-1 rounded-md`}
            onClick={() => handleVariant("extended")}
          >
            Extended
          </button>
        </div>

        {/* format picker */}
        <div className="flex justify-center border-b border-primary_2 mb-3">
          <button
            className={`${
              format === "text"
                ? "text-secondary border-b-secondary"
                : "text-white"
            } mx-1 p-1 rounded-md`}
            onClick={() => handleFormat("text")}
          >
            Text
          </button>
          <button
            className={`${
              format === "file"
                ? "text-secondary border-b-secondary"
                : "text-white"
            } mx-1 p-1 rounded-md`}
            onClick={() => handleFormat("file")}
          >
            File
          </button>
        </div>

        {/* input/output */}
        <div className="flex">
          {/* input */}
          <div className="basis-5/12 flex-col mx-1">
            <h2 className="ml-1 mb-1 flex text-md font-semibold">Input</h2>
            {/* text input */}
            {format === "text" && (
              <textarea
                id="input"
                rows="10"
                className="w-full p-2 text-sm bg-primary_2 rounded-md border border-primary_3 focus:ring-blue-50"
                placeholder="Write plaintext here..."
              ></textarea>
            )}

            {/* file input */}
            {format === "file" && (
              <div className="flex-col">
                <label
                  htmlFor="upload-file"
                  className="flex mb-1.5 w-full h-[200px] border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex-col w-full my-auto">
                    <MdFileUpload
                      className="mx-auto mb-1"
                      size="32"
                      color="#9CA3AF"
                    />
                    <p className="text-sm text-gray-400">
                      Click here to upload file...
                    </p>
                    <p className="text-xs text-gray-400">(txt format)</p>
                  </div>
                  <input
                    id="upload-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                <div className="flex">
                  <p className="ml-1 text-xs font-bold text-left">
                    File name:{" "}
                  </p>
                  <p className="ml-1 text-xs break-all text-left">
                    {fileName ? fileName : "No file uploaded..."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* key */}
          <div className="basis-2/12 flex-col mx-1">
            <h2 className="ml-1 mb-1 flex text-md font-semibold">Key</h2>
            <textarea
              id="key"
              rows="5"
              className="w-full p-2 text-sm bg-primary_2 rounded-md border border-primary_3 focus:ring-blue-50"
              placeholder="Write key here..."
            ></textarea>
            <div className="lg:flex">
              <button className="bg-primary_2 hover:bg-primary_3 border-primary_3 text-secondary px-2 py-1.5 my-1 lg:mr-1 rounded flex items-center mx-auto">
                <MdLockOutline size="16" />
                <span className="text-sm">Encrypt</span>
              </button>
              <button className="bg-primary_2 hover:bg-primary_3 border-primary_3 text-secondary px-2 py-1.5 my-1 lg:ml-1 rounded flex items-center mx-auto">
                <MdLockOpen size="16" />
                <span className="text-sm">Decrypt</span>
              </button>
            </div>
          </div>

          {/* output */}
          <div className="basis-5/12 flex-col mx-1">
            <h2 className="ml-1 mb-1 flex text-md font-semibold">Output</h2>
            <div className="relative">
              <textarea
                readOnly
                id="output"
                rows="10"
                className="w-full p-2 text-sm bg-primary_2 rounded-md border border-primary_3"
              ></textarea>
              <button className="absolute right-2 top-2 rounded-md p-1">
                <MdFileDownload size="20" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Viginere;
