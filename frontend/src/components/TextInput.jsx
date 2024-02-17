import PropTypes from "prop-types";

const TextInput = ({ handleOnChangeParent }) => {
  const handleOnChange = (e) => {
    handleOnChangeParent(e.target.value);
  };

  return (
    <textarea
      id="input"
      rows="10"
      className="w-full p-2 text-sm bg-primary_2 rounded-md border border-primary_3 focus:ring-blue-50"
      placeholder="Write plaintext here..."
      onChange={handleOnChange}
    ></textarea>
  );
};

export default TextInput;

TextInput.propTypes = {
  handleOnChangeParent: PropTypes.func.isRequired,
};
