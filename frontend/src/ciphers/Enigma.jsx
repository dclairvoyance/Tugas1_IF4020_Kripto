import { useState, useEffect } from "react";
import { MdLockOutline } from "react-icons/md";
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
  const [userOutput, setUserOutput] = useState(""); // base64
  const [fileOutput, setFileOutput] = useState(""); // 26-alphabet

  /* specific Enigma: rotors */
  const [rotorsSettings, setRotorsSettings] = useState(["E", "N", "G", "M"]);
  const [userInputChar, setUserInputChar] = useState("");
  const [userOutputChar, setUserOutputChar] = useState("");

  useEffect(() => {
    if (userInputChar !== "") {
      enigmaSendMessage();
      setUserInputChar("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInputChar]);

  {
    /* encryption/decryption */
  }
  const enigmaSendMessage = async () => {
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
      if (format === "keyboard") {
        setUserOutputChar(data.message);
        let newUserOutput = fileOutput;
        newUserOutput += data.message;
        setUserOutput(btoa(newUserOutput));
        setFileOutput(newUserOutput);
      } else {
        setUserOutput(btoa(data.message));
        setFileOutput(data.message);
      }
      handleRotorsRotate(data.next_key);
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
    setUserInput("");
    setUserOutput("");
    setFileOutput("");
    setFileInputName("No file uploaded...");
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
    const file = new Blob([fileOutput], {
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

  const handleRotorsRotate = (keys) => {
    /* rotate in frontend */
    // const newRotorsSettings = [...rotorsSettings];
    // let i = newRotorsSettings.length - 1;
    // while (i >= 0) {
    //   if (newRotorsSettings[i].charCodeAt() === 90) {
    //     newRotorsSettings[i] = String.fromCharCode(65);
    //     i--;
    //   } else {
    //     newRotorsSettings[i] = String.fromCharCode(
    //       newRotorsSettings[i].charCodeAt() + 1
    //     );
    //     break;
    //   }
    // }
    // setRotorsSettings(newRotorsSettings);

    /* rotate in backend */
    setRotorsSettings(keys.split(""));
  };

  const handleUserInputChar = (charInput) => {
    setUserInput(charInput);
    setUserInputChar(charInput);
  };

  return (
    <>
      <div className="p-2 bg-primary_1 rounded-md">
        {/* format picker */}
        <Subpage
          currentVariable={format}
          handleVariable={handleFormat}
          variables={["text", "file", "keyboard"]}
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

            {/* keyboard input */}
            {format === "keyboard" && (
              <Keyboard
                active={userInputChar}
                handleOnClickParent={handleUserInputChar}
              />
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
            <div>
              <button
                onClick={enigmaSendMessage}
                className="bg-primary_2 hover:bg-primary_3 border-primary_3 text-secondary px-2 py-1.5 my-1 rounded flex items-center mx-auto"
              >
                <MdLockOutline size="16" />
                <span className="text-sm">Send</span>
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
            {format === "keyboard" && (
              <>
                <Keyboard active={userOutputChar} />
                <textarea
                  readOnly
                  id="output"
                  rows="2"
                  className="w-full p-2 text-sm text-gray-400 bg-primary_2 rounded-md border border-primary_3"
                  value={fileOutput}
                ></textarea>
                <h2 className="mb-1 h-8 items-center ml-1 flex text-md font-semibold text-white">
                  Base64
                </h2>
                <textarea
                  readOnly
                  id="outputBase64"
                  rows="2"
                  className="w-full p-2 text-sm text-gray-400 bg-primary_2 rounded-md border border-primary_3"
                  value={userOutput}
                ></textarea>
              </>
            )}
            {(format === "text" || format === "file") && (
              <>
                <textarea
                  readOnly
                  id="output"
                  rows="5"
                  className="w-full p-2 text-sm text-gray-400 bg-primary_2 rounded-md border border-primary_3"
                  value={fileOutput}
                ></textarea>
                <h2 className="mb-1 h-8 items-center ml-1 flex text-md font-semibold text-white">
                  Base64
                </h2>
                <textarea
                  readOnly
                  id="outputBase64"
                  rows="5"
                  className="w-full p-2 text-sm text-gray-400 bg-primary_2 rounded-md border border-primary_3"
                  value={userOutput}
                ></textarea>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Enigma;
