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
    <div className="w-full bg-primary_2 rounded-md mr-1 border border-primary_3">
      <div className="flex justify-center cursor-pointer">
        <MdKeyboardArrowUp
          color="white"
          onClick={() => handleRotorChange(-1)}
        />
      </div>
      <div className="text-white text-lg">{rotorSettings}</div>
      <div className="flex justify-center cursor-pointer">
        <MdKeyboardArrowDown
          color="white"
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
