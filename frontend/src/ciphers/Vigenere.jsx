import { useState, useRef } from "react";
import {
  MdLockOutline,
  MdLockOpen,
  MdFileDownload,
  MdFileUpload,
} from "react-icons/md";
import Subpage from "../components/Subpage";

const Vigenere = () => {
  const [variant, setVariant] = useState("standard");
  const [format, setFormat] = useState("text");
  const [fileName, setFileName] = useState("");
  const [downloadFileName, setDownloadFileName] = useState("");
  const [userInput, setUserInput] = useState("");
  const [userKey, setUserKey] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const outputTextArea = useRef(null);

  const encryptAction = async () => {
    if (variant === "standard") {
      await vigenereEncryptMessage();
    }
  };

  const vigenereEncryptMessage = async () => {
    try {
      const response = await fetch("http://localhost:3001/vigenere_encrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput, userKey }),
      });
      const data = await response.json();
      setUserOutput(data.message);
    } catch (error) {
      console.error("Error: ", error);
      setUserOutput("Error encrypting message.");
    }
  };

  const decryptAction = async () => {
    if (variant === "standard") {
      await vigenereDecryptMessage();
    }
  };

  const vigenereDecryptMessage = async () => {
    try {
      const response = await fetch("http://localhost:3001/vigenere_decrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput, userKey }),
      });
      const data = await response.json();
      setUserOutput(data.message);
    } catch (error) {
      console.error("Error: ", error);
      setUserOutput("Error decrypting message.");
    }
  };

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
  const handleDownloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([outputTextArea.current.value], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = downloadFileName;
    document.body.appendChild(element); // Firefox
    element.click();
  };

  return (
    <>
      <div className="p-2 bg-primary_1 rounded-md">
        {/* variant picker */}
        <Subpage
          currentVariable={variant}
          handleVariable={handleVariant}
          variables={["standard", "autokey", "extended"]}
        />

        {/* format picker */}
        <Subpage
          currentVariable={format}
          handleVariable={handleFormat}
          variables={["text", "file"]}
        />

        {/* input/output */}
        <div className="flex">
          {/* input */}
          <div className="basis-5/12 flex-col mx-1">
            <h2 className="h-8 items-center ml-1 mb-1 flex text-md font-semibold">
              Input
            </h2>
            {/* text input */}
            {format === "text" && (
              <textarea
                id="input"
                rows="10"
                className="w-full p-2 text-sm bg-primary_2 rounded-md border border-primary_3 focus:ring-blue-50"
                placeholder="Write plaintext here..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
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
            <h2 className="h-8 items-center ml-1 mb-1 flex text-md font-semibold">
              Key
            </h2>
            <textarea
              id="key"
              rows="5"
              className="w-full p-2 text-sm bg-primary_2 rounded-md border border-primary_3 focus:ring-blue-50"
              placeholder="Write key here..."
              value={userKey}
              onChange={(e) => setUserKey(e.target.value)}
            ></textarea>
            <div className="lg:flex">
              <button
                onClick={encryptAction}
                className="bg-primary_2 hover:bg-primary_3 border-primary_3 text-secondary px-2 py-1.5 my-1 lg:mr-1 rounded flex items-center mx-auto"
              >
                <MdLockOutline size="16" />
                <span className="text-sm">Encrypt</span>
              </button>
              <button
                onClick={decryptAction}
                className="bg-primary_2 hover:bg-primary_3 border-primary_3 text-secondary px-2 py-1.5 my-1 lg:ml-1 rounded flex items-center mx-auto"
              >
                <MdLockOpen size="16" />
                <span className="text-sm">Decrypt</span>
              </button>
            </div>
          </div>

          {/* output */}
          <div className="basis-5/12 flex-col mx-1">
            <div className="md:flex md:justify-between mb-1">
              <h2 className="h-8 items-center ml-1 flex text-md font-semibold">
                Output
              </h2>
              {/* download as txt file */}
              <div className="flex mt-1 md:mt-0">
                <input
                  type="text"
                  id="file-name"
                  onChange={(e) => setDownloadFileName(e.target.value)}
                  className="md:w-32 w-full p-1.5 rounded-s-md bg-primary_2 border-y border-l border-primary_3 focus:ring-blue-50 text-xs"
                  placeholder="File Name"
                />
                <button
                  onClick={handleDownloadFile}
                  className="p-1.5 rounded-e-md rounded-none bg-primary_3 border border-primary_3"
                >
                  <MdFileDownload />
                </button>
              </div>
            </div>
            <textarea
              readOnly
              id="output"
              ref={outputTextArea}
              rows="10"
              className="w-full p-2 text-sm bg-primary_2 rounded-md border border-primary_3"
              value={userOutput}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vigenere;
