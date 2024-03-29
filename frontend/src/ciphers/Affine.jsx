import { useState, useRef } from "react";
import { MdLockOutline, MdLockOpen } from "react-icons/md";
import Subpage from "../components/Subpage";
import TextInput from "../components/TextInput";
import FileInput from "../components/FileInput";
import FileOutput from "../components/FileOutput";

const Affine = () => {
  const [format, setFormat] = useState("text");
  const [fileInputName, setFileInputName] = useState("");
  const [fileOutputName, setFileOutputName] = useState("");
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [outputBase64, setOutputBase64] = useState("");
  const outputTextArea = useRef(null);

  /* specific Affine: aCoef & bCoef*/
  const [aCoef, setACoef] = useState("");
  const [bCoef, setBCoef] = useState("");

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

  const encryptAction = async () => {
    try {
      const response = await fetch("http://localhost:3001/affine_encrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput, aCoef, bCoef }),
      });
      const data = await response.json();
      setUserOutput(data.message);
      if(data.message === "inverse number not found" || data.message === "A coefficient error"){
        setOutputBase64("");
      } else {
        setOutputBase64(btoa(data.message));
      }
    } catch (error) {
      console.error("Error: ", error);
      setUserOutput("Error encrypting message.");
    }
  };

  const decryptAction = async () => {
    try {
      const response = await fetch("http://localhost:3001/affine_decrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput, aCoef, bCoef }),
      });
      const data = await response.json();
      setUserOutput(data.message);
      if(data.message === "inverse number not found" || data.message === "A coefficient error"){
        setOutputBase64("");
      } else {
        setOutputBase64(btoa(data.message));
      }
    } catch (error) {
      console.error("Error: ", error);
      setUserOutput("Error encrypting message.");
    }
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
            <h2 className="h-8 items-center ml-1 mb-4 flex text-lg font-semibold text-white">
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
            <h2 className="h-8 items-center ml-1 mb-4 flex text-lg font-semibold text-white">
              Key
            </h2>
            <div className="md:flex mb-0.5">
              <div className="flex mb-1 md:w-1/2">
                <p className="flex items-center ml-1 text-lg font-semibold text-left text-white">
                  A:{" "}
                </p>
                <input
                  id="key"
                  type="number"
                  className="w-20 ml-1 p-1.5 text-lg text-white bg-primary_2 rounded-md border border-primary_3 focus:ring-blue-50"
                  value={aCoef}
                  onChange={(e) => setACoef(e.target.value)}
                ></input>
              </div>
              <div className="flex mb-1 md:w-1/2">
                <p className="flex items-center ml-1 text-lg font-semibold text-left text-white">
                  B:{" "}
                </p>
                <input
                  id="key"
                  type="number"
                  className="w-20 ml-1 p-1.5 text-lg text-white bg-primary_2 rounded-md border border-primary_3 focus:ring-blue-50"
                  value={bCoef}
                  onChange={(e) => setBCoef(e.target.value)}
                ></input>
              </div>
            </div>
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
              <h2 className="h-8 items-center ml-1 flex text-lg font-semibold text-white">
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
              rows="5"
              className="w-full p-2 text-lg text-white bg-primary_2 rounded-md border border-primary_3"
              value={userOutput}
            ></textarea>
            <h2 className="mb-1 h-8 items-center ml-1 flex text-lg font-semibold text-white">
              Base64
            </h2>
            <textarea
              readOnly
              id="output"
              rows="5"
              className="w-full p-2 text-lg text-white bg-primary_2 rounded-md border border-primary_3"
              value={outputBase64}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default Affine;
