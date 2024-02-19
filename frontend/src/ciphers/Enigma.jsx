import { useState, useRef } from "react";
import { MdLockOutline, MdLockOpen } from "react-icons/md";
import Subpage from "../components/Subpage";
import TextInput from "../components/TextInput";
import FileInput from "../components/FileInput";
import FileOutput from "../components/FileOutput";
import RotorEnigma from "../components/RotorEnigma";
import Keyboard from "../components/Keyboard";

const Enigma = () => {
  const [format, setFormat] = useState("text");
  const [fileInputName, setFileInputName] = useState("");
  const [fileOutputName, setFileOutputName] = useState("");
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const outputTextArea = useRef(null);

  /* specific Enigma: rotors */
  const [rotorsSettings, setRotorsSettings] = useState(["E", "N", "G", "M"]);
  const [userInputChar, setUserInputChar] = useState("");
  const [userOutputChar, setUserOutputChar] = useState("");

  {
    /* encryption/decryption */
  }
  const enigmaEncryptLetter = async (char) => {
    try {
      var userKey = rotorsSettings.flat().join(" ");
      const response = await fetch("http://localhost:3001/enigma_encrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput: char,
          userKey,
        }),
      });
      const data = await response.json();
      let newUserOutput = userOutput;
      newUserOutput = newUserOutput += data.message;
      setUserOutput(newUserOutput);
      setUserOutputChar(data.message);
      handleRotorsRotate();
    } catch (error) {
      console.error("Error: ", error);
      setUserOutput("Error encrypting message.");
    }
  };

  const enigmaEncryptMessage = async () => {
    try {
      var userKey = rotorsSettings.flat().join(" ");
      const response = await fetch("http://localhost:3001/enigma_encrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput,
          userKey,
        }),
      });
      const data = await response.json();
      setUserOutput(data.message);
    } catch (error) {
      console.error("Error: ", error);
      setUserOutput("Error encrypting message.");
    }
  };

  const enigmaDecryptMessage = async () => {
    try {
      var userKey = rotorsSettings.flat().join(" ");
      const response = await fetch("http://localhost:3001/enigma_decrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput,
          userKey,
        }),
      });
      const data = await response.json();
      setUserOutput(data.message);
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
    /* specific Enigma */
  }
  const handleRotorSettingsChange = (index, rotorSettings) => {
    const newRotorsSettings = [...rotorsSettings];
    newRotorsSettings[index] = rotorSettings;
    setRotorsSettings(newRotorsSettings);
  };

  const handleRotorsRotate = () => {
    const newRotorsSettings = [...rotorsSettings];
    let i = newRotorsSettings.length - 1;
    while (i >= 0) {
      if (newRotorsSettings[i].charCodeAt() === 90) {
        newRotorsSettings[i] = String.fromCharCode(65);
        i--;
      } else {
        newRotorsSettings[i] = String.fromCharCode(
          newRotorsSettings[i].charCodeAt() + 1
        );
        break;
      }
    }
    setRotorsSettings(newRotorsSettings);
  };

  const handleUserInputChar = (charInput) => {
    setUserInputChar(charInput);
    enigmaEncryptLetter(charInput);
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
              <>
                <TextInput handleOnChangeParent={handleUserInput} />
                {/* keyboard input */}
                <Keyboard
                  active={userInputChar}
                  handleOnClickParent={handleUserInputChar}
                />
              </>
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
            <div className="flex">
              <RotorEnigma
                index={0}
                rotorSettings={rotorsSettings[0]}
                handleOnChangeParent={handleRotorSettingsChange}
              />
              <RotorEnigma
                index={1}
                rotorSettings={rotorsSettings[1]}
                handleOnChangeParent={handleRotorSettingsChange}
              />
              <RotorEnigma
                index={2}
                rotorSettings={rotorsSettings[2]}
                handleOnChangeParent={handleRotorSettingsChange}
              />
              <RotorEnigma
                index={3}
                rotorSettings={rotorsSettings[3]}
                handleOnChangeParent={handleRotorSettingsChange}
              />
            </div>
            <div className="lg:flex">
              <button
                onClick={enigmaEncryptMessage}
                className="bg-primary_2 hover:bg-primary_3 border-primary_3 text-secondary px-2 py-1.5 my-1 lg:mr-1 rounded flex items-center mx-auto"
              >
                <MdLockOutline size="16" />
                <span className="text-sm">Encrypt</span>
              </button>
              <button
                onClick={enigmaDecryptMessage}
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
              <h2 className="h-8 items-center ml-1 flex text-md font-semibol text-white">
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
            {format === "text" && <Keyboard active={userOutputChar} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Enigma;
