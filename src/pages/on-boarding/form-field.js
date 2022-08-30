import { Component } from "react";

export default class FormField extends Component {
  render() {
    const { field, formData } = this.props;
    const isURLField = field.name === "workSpaceURL";
    return (
      <div className="form-field">
        <p className="fieldData-name">
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
            style={{ width: isURLField ? "210px" : "340px", borderRadius: isURLField ? "0px 4px 4px 0px" : "4px" }}
            className="text-field"
            type="text"
            placeholder={field.placeHolder}
            name={field.name}
            value={formData[field.name]}
            onChange={(ev) => this.props.updateData(ev.target)}
          />
        </div>
      </div>
    );
  }
}
