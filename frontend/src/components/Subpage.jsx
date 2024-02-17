import PropTypes from "prop-types";

const Subpage = ({ currentVariable, handleVariable, variables }) => {
  return (
    <div className="flex justify-center border-b border-primary_2 mb-2">
      {variables?.map((variable) => {
        return (
          <SubpageItem
            key={variable}
            currentVariable={currentVariable}
            handleVariable={handleVariable}
            variable={variable}
          />
        );
      })}
    </div>
  );
};

Subpage.propTypes = {
  currentVariable: PropTypes.string.isRequired,
  handleVariable: PropTypes.func.isRequired,
  variables: PropTypes.array,
};

const SubpageItem = ({ currentVariable, handleVariable, variable }) => {
  return (
    <button
      className={`${
        currentVariable === variable
          ? "text-secondary border-b-secondary"
          : "text-white"
      } mx-1 p-1 rounded-md`}
      onClick={() => handleVariable(variable)}
    >
      {variable.charAt(0).toUpperCase() + variable.slice(1)}
    </button>
  );
};

SubpageItem.propTypes = {
  currentVariable: PropTypes.string.isRequired,
  handleVariable: PropTypes.func.isRequired,
  variable: PropTypes.string.isRequired,
};

export default Subpage;
