import PropTypes from "prop-types";

const Keyboard = ({ active, handleOnClickParent }) => {
  const keyboard = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  return (
    <>
      {keyboard.map((row, rowIndex) => (
        <div key={rowIndex} className="w-full flex justify-center gap-1 my-1">
          {row.map((char) => (
            <button
              key={char}
              className={`${
                active === char
                  ? "bg-secondary text-black"
                  : "bg-primary_2 text-gray-400"
              } md:w-6 rounded-md border border-primary_3`}
              onClick={() => handleOnClickParent(char)}
            >
              {char}
            </button>
          ))}
        </div>
      ))}
    </>
  );
};

Keyboard.propTypes = {
  active: PropTypes.string.isRequired,
  handleOnClickParent: PropTypes.func,
};

export default Keyboard;
