import { MdFileDownload } from "react-icons/md";
import PropTypes from "prop-types";

const FileOutput = ({ handleOnChangeParent, handleOnSubmitParent }) => {
  const handleOnChange = (e) => {
    handleOnChangeParent(e.target.value);
  };

  return (
    <div className="flex mt-1 md:mt-0">
      <input
        type="text"
        id="file-name"
        onChange={handleOnChange}
        className="md:w-32 w-full p-1.5 rounded-s-md bg-primary_2 border-y border-l border-primary_3 focus:ring-blue-50 text-xs"
        placeholder="File Name"
      />
      <button
        onClick={handleOnSubmitParent}
        className="p-1.5 rounded-e-md rounded-none bg-primary_3 border border-primary_3"
      >
        <MdFileDownload />
      </button>
    </div>
  );
};

FileOutput.propTypes = {
  handleOnChangeParent: PropTypes.func.isRequired,
  handleOnSubmitParent: PropTypes.func.isRequired,
};

export default FileOutput;
