import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import PropTypes from "prop-types";

const RotorEnigma = ({ index, rotorSettings, handleOnChangeParent }) => {
  const modulo = (num, mod) => {
    return ((num % mod) + mod) % mod;
  };

  const handleRotorChange = (direction) => {
    const newRotorSettings = String.fromCharCode(
      modulo(rotorSettings?.charCodeAt() - 65 + direction, 26) + 65
    );
    handleOnChangeParent(index, newRotorSettings);
  };

  return (
    <div className="w-full bg-primary_2 rounded-md mr-1">
      <div className="flex justify-center cursor-pointer">
        <MdKeyboardArrowUp
          color="#9ca3af"
          onClick={() => handleRotorChange(-1)}
        />
      </div>
      <div className="text-gray-400">{rotorSettings}</div>
      <div className="flex justify-center cursor-pointer">
        <MdKeyboardArrowDown
          color="#9ca3af"
          onClick={() => handleRotorChange(1)}
        />
      </div>
    </div>
  );
};

RotorEnigma.propTypes = {
  index: PropTypes.number,
  rotorSettings: PropTypes.string,
  handleOnChangeParent: PropTypes.func.isRequired,
};

export default RotorEnigma;
