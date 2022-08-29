import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class BoardingProcess extends React.Component {
  updateformData = (field) => {
    const { name, value } = field;
    const { formData } = this.props;
    formData[name] = value;
    this.props.handleChange("formValues", formData);
  };

  render() {
    const { formData, activeSection, sectionNames, secIndex } = this.props;
    const { fullName, displayName, workSpaceName, planning } = formData;
    const disabled = secIndex === 3 ? null : secIndex === 0 ? !(fullName && displayName) : secIndex === 1 ? !workSpaceName : planning === null;

    return (
      <div className="section">
        {secIndex < 2
          ? activeSection["formDetails"]?.map((field) => {
              const isURLField = field.name === "workSpaceURL";
              return (
                <div className="form-field" key={field.name}>
                  <p className="field-name">
                    {field.desc}
                    {isURLField && <span className="ghost-white"> (optional)</span>}
                  </p>
                  <div className="input-field">
                    {isURLField && (
                      <p className="text-field ghost-white" style={{ width: "140px", background: "#F8F9FC", borderRadius: "4px 0px 0px 4px" }}>
                        www.eden.com/
                      </p>
                    )}
                    <input
                      style={{ width: isURLField ? "210px" : "350px", borderRadius: isURLField ? "0px 4px 4px 0px" : "4px" }}
                      className="text-field"
                      type="text"
                      placeholder={field.placeHolder}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={(ev) => this.updateformData(ev.target)}
                    />
                  </div>
                </div>
              );
            })
          : secIndex === 2 && (
              <div className="planning">
                {activeSection?.formDetails.map((exp, index) => {
                  return (
                    <div
                      className={`plan ${planning === index ? "selected-plan" : ""}`}
                      key={exp.planFor}
                      onClick={(ev) => {
                        this.updateformData({ name: "planning", value: index });
                      }}
                    >
                      <FontAwesomeIcon className="user-icon" icon={exp.userIcn} />
                      <p className="plan-for">{exp.planFor}</p>
                      <p className="plan-desc ghost-white">{exp.desc}</p>
                    </div>
                  );
                })}
              </div>
            )}

        {sectionNames[secIndex] === "launch" ? (
          <button className="submit-btn">Launch Eden</button>
        ) : (
          <button className="submit-btn" onClick={() => this.props.handleChange("secIndex", secIndex + 1)} disabled={disabled}>
            Create WorkSpace
          </button>
        )}
      </div>
    );
  }
}

export default BoardingProcess;
