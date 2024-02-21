import { useState, useRef } from "react";
import { MdLockOutline, MdLockOpen } from "react-icons/md";
import Subpage from "../components/Subpage";
import TextInput from "../components/TextInput";
import FileInput from "../components/FileInput";
import FileOutput from "../components/FileOutput";

const Hill = () => {
  const [format, setFormat] = useState("text");
  const [fileInputName, setFileInputName] = useState("");
  const [fileOutputName, setFileOutputName] = useState("");
  const [userInput, setUserInput] = useState("");
  const [keyValues, setKeyValues] = useState([]);
  const [userOutput, setUserOutput] = useState("");
  const [outputBase64, setOutputBase64] = useState("");
  const outputTextArea = useRef(null);

  /* specific Hill: matrix key */
  const [keySize, setKeySize] = useState(3);
  const [keySizeInput, setKeySizeInput] = useState(3);

  {
    /* encryption/decryption */
  }
  const hillEncryptMessage = async () => {
    try {
      var keyMatrix = keyValues.flat().join(" ");
      const response = await fetch("http://localhost:3001/hill_encrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput,
          cipherMatrix: keyMatrix,
          size: keySize,
        }),
      });
      const data = await response.json();
      setUserOutput(data.message);
      setOutputBase64(btoa(data.message));
    } catch (error) {
      console.error("Error: ", error);
      setUserOutput("Error encrypting message.");
    }
  };

  const hillDecryptMessage = async () => {
    try {
      var keyMatrix = keyValues.flat().join(" ");
      const response = await fetch("http://localhost:3001/hill_decrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput,
          cipherMatrix: keyMatrix,
          size: keySize,
        }),
      });
      const data = await response.json();
      setUserOutput(data.message);
      setOutputBase64(btoa(data.message));
    } catch (error) {
      console.error("Error: ", error);
      setUserOutput("Error encrypting message.");
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

  {
    /* specific Hill */
  }
  const handleKeySizeChange = (e) => {
    setKeySizeInput(e.target.value);
    let newKeySize = e.target.value ? parseInt(e.target.value) : 0;
    newKeySize = newKeySize < 2 ? 2 : newKeySize;
    setKeySize(newKeySize);
    setKeyValues(Array.from({ length: newKeySize * newKeySize }, () => ""));
  };

  const handleKeyValuesChange = (e, index) => {
    const newKeyValues = [...keyValues];
    newKeyValues[index] = e.target.value;
    setKeyValues(newKeyValues);
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
            <div className="flex mb-2">
              <p className="ml-1 text-sm font-semibold text-left text-white">
                Key size:{" "}
              </p>
              <input
                className="ml-1 text-sm text-center w-8 rounded-md border-r border-b"
                type="number"
                min="2"
                value={keySizeInput}
                onChange={handleKeySizeChange}
              />
            </div>
            <div className="flex-col mb-3">
              {Array.from({ length: keySize }, (_, rowIndex) => (
                <div className="flex" key={rowIndex}>
                  {Array.from({ length: keySize }, (_, colIndex) => (
                    <input
                      className={`${colIndex !== keySize - 1 ? "mr-1" : ""} ${
                        rowIndex !== keySize - 1 ? "mb-1" : ""
                      } border-r border-b w-full text-center rounded-md`}
                      key={colIndex}
                      type="number"
                      step="1"
                      value={keyValues[rowIndex * keySize + colIndex]}
                      onChange={(e) =>
                        handleKeyValuesChange(e, rowIndex * keySize + colIndex)
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="lg:flex">
              <button
                onClick={hillEncryptMessage}
                className="bg-primary_2 hover:bg-primary_3 border-primary_3 text-secondary px-2 py-1.5 my-1 lg:mr-1 rounded flex items-center mx-auto"
              >
                <MdLockOutline size="16" />
                <span className="text-sm">Encrypt</span>
              </button>
              <button
                onClick={hillDecryptMessage}
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
              rows="5"
              className="w-full p-2 text-sm text-gray-400 bg-primary_2 rounded-md border border-primary_3"
              value={userOutput}
            ></textarea>
            <h2 className="mb-1 h-8 items-center ml-1 flex text-md font-semibold text-white">
              Base64
            </h2>
            <textarea
              readOnly
              id="output"
              rows="5"
              className="w-full p-2 text-sm text-gray-400 bg-primary_2 rounded-md border border-primary_3"
              value={outputBase64}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hill;
