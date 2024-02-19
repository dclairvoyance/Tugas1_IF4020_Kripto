import { MdFileUpload } from "react-icons/md";
import PropTypes from "prop-types";

const FileInput = ({ handleOnChangeParent, fileName }) => {
  return (
    <div className="flex-col">
      <label
        htmlFor="upload-file"
        className="flex mb-1.5 w-full h-[200px] border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex-col w-full my-auto">
          <MdFileUpload className="mx-auto mb-1" size="32" color="#9CA3AF" />
          <p className="text-sm text-gray-400">Click here to upload file...</p>
          <p className="text-xs text-gray-400">(txt format)</p>
        </div>
        <input
          id="upload-file"
          type="file"
          className="hidden"
          onChange={handleOnChangeParent}
        />
      </label>
      <div className="flex">
        <p className="ml-1 text-xs font-bold text-left text-white">
          File name:{" "}
        </p>
        <p className="ml-1 text-xs break-all text-left text-gray-400">
          {fileName ? fileName : "No file uploaded..."}
        </p>
      </div>
    </div>
  );
};

FileInput.propTypes = {
  handleOnChangeParent: PropTypes.func.isRequired,
  fileName: PropTypes.string.isRequired,
};

export default FileInput;
