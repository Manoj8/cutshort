import React from "react";
import FormField from "./form-field";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class BoardingProcess extends React.Component {
  updateData = (field) => {
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
              return <FormField field={field} formData={formData} updateData={this.updateData} />;
            })
          : secIndex === 2 && (
              <div className="planning">
                {activeSection?.formDetails.map((exp, index) => {
                  return (
                    <div
                      className={`plan ${planning === index ? "selected-plan" : ""}`}
                      key={exp.planFor}
                      onClick={(ev) => {
                        this.updateData({ name: "planning", value: index });
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
