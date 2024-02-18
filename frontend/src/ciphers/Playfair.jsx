import { useState, useRef } from "react";
import { MdLockOutline, MdLockOpen } from "react-icons/md";
import Subpage from "../components/Subpage";
import TextInput from "../components/TextInput";
import FileInput from "../components/FileInput";
import FileOutput from "../components/FileOutput";

const Playfair = () => {
  const [format, setFormat] = useState("text");
  const [fileInputName, setFileInputName] = useState("");
  const [fileOutputName, setFileOutputName] = useState("");
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const outputTextArea = useRef(null);

  /* specific Playfair: key */
  const [userKey, setUserKey] = useState("");

  {
    /* encryption/decryption */
  }
  const playfairEncryptMessage = async () => {
    try {
      const response = await fetch("http://localhost:3001/playfair_encrypt", {
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

  const playfairDecryptMessage = async () => {
    try {
      const response = await fetch("http://localhost:3001/playfair_decrypt", {
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

  {
    /* templates */
  }
  const handleFormat = (format) => {
    setFormat(format);
  };

  const handleUserInput = (textInput) => {
    setUserInput(textInput);
  };
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFileInputName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      setUserInput(e.target.result);
    };
    reader.readAsText(file);
  };

  const handleFileOutputChange = (fileNameInput) => {
    setFileOutputName(fileNameInput);
  };
  const handleFileOutputSubmit = () => {
    const element = document.createElement("a");
    const file = new Blob([outputTextArea.current.value], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = fileOutputName ? fileOutputName : "encrypted";
    document.body.appendChild(element); // Firefox
    element.click();
  };

  return (
    <>
      <div className="p-2 bg-primary_1 rounded-md">
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
            <h2 className="h-8 items-center ml-1 mb-1 flex text-md font-semibold text-white">
              Input
            </h2>
            {/* text input */}
            {format === "text" && (
              <TextInput handleOnChangeParent={handleUserInput} />
            )}

            {/* file input */}
            {format === "file" && (
              <FileInput
                handleOnChangeParent={handleFileInputChange}
                fileName={fileInputName}
              />
            )}
          </div>

          {/* key */}
          <div className="basis-2/12 flex-col mx-1">
            <h2 className="h-8 items-center ml-1 mb-1 flex text-md font-semibold text-white">
              Key
            </h2>
            <textarea
              id="key"
              rows="5"
              className="w-full p-2 text-sm text-gray-400 bg-primary_2 rounded-md border border-primary_3 focus:ring-blue-50"
              placeholder="Write key here..."
              value={userKey}
              onChange={(e) => setUserKey(e.target.value)}
            ></textarea>
            <div className="lg:flex">
              <button
                onClick={playfairEncryptMessage}
                className="bg-primary_2 hover:bg-primary_3 border-primary_3 text-secondary px-2 py-1.5 my-1 lg:mr-1 rounded flex items-center mx-auto"
              >
                <MdLockOutline size="16" />
                <span className="text-sm">Encrypt</span>
              </button>
              <button
                onClick={playfairDecryptMessage}
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
              <h2 className="h-8 items-center ml-1 flex text-md font-semibold text-white">
                Output
              </h2>
              {/* download as txt file */}
              <FileOutput
                handleOnChangeParent={handleFileOutputChange}
                handleOnSubmitParent={handleFileOutputSubmit}
              />
            </div>
            <textarea
              readOnly
              id="output"
              ref={outputTextArea}
              rows="10"
              className="w-full p-2 text-sm text-gray-400 bg-primary_2 rounded-md border border-primary_3"
              value={userOutput}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playfair;
