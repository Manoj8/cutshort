import React from "react";
import BoardingProcess from "./boarding-process";
import Logo from "../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./on-boaring.scss";

class OnBoarding extends React.Component {
  constructor() {
    super();
    this.state = {
      formValues: {
        fullName: "",
        displayName: "",
        workSpaceName: "",
        workSpaceURL: "",
        planning: null,
      },
      secIndex: 0,
    };
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    const { secIndex, formValues = {} } = this.state;
    const sections = {
      welcome: {
        heading: "Welcome! First things first..",
        subHeading: "You can always change them later.",
        formDetails: [
          {
            desc: "Full Name",
            name: "fullName",
            placeHolder: "Steve Jobs",
          },
          {
            desc: "Display Name",
            name: "displayName",
            placeHolder: "Steve",
          },
        ],
      },
      setUp: {
        heading: "Let's set up a home for all the work",
        subHeading: "You can always create another workspace later.",
        formDetails: [
          {
            desc: "Workspace Name",
            name: "workSpaceName",
            placeHolder: "Eden",
          },
          {
            desc: "Workspace URL",
            name: "workSpaceURL",
            placeHolder: "Example",
          },
        ],
      },
      planning: {
        heading: `How are you planning to use Eden?`,
        subHeading: "We'll streamline your experience accordingly.",
        formDetails: [
          { planFor: "For myself", desc: "Write better. Think more clearly. Stay organized", userIcn: faUser },
          { planFor: "With my team", desc: "Wikis, docs, tasks & projects, all in one place.", userIcn: faUsers },
        ],
      },
      launch: {
        heading: `Congratulations, ${formValues.fullName}!`,
        subHeading: "You have completed onboarding, you can start using Eden!",
      },
    };

    const sectionNames = Object.keys(sections);
    const activeSection = sections[sectionNames[secIndex]];

    let barWidth = (340 * secIndex) / 3;
    barWidth = secIndex < 3 ? barWidth + 340 / 6 : barWidth;
    return (
      <div className="on-boarding">
        <div className="section">
          <h1>
            <img src={Logo} alt="logo" className="logo" />
            Eden
          </h1>
        </div>
        <div className="section">
          <div className="progress-container">
            <hr className="progress completed-pbar" style={{ width: barWidth, left: "0px" }} />
            <hr className="progress" style={{ width: 340 - barWidth, left: barWidth }} />

            {sectionNames?.map((section, index) => {
              return (
                <button
                  key={section}
                  className={`stepper ${secIndex + 1 > index ? "progress-completed" : ""}`}
                  onClick={() => {
                    this.setState({ secIndex: index });
                  }}
                  disabled={index > secIndex}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>

        {secIndex === 3 && (
          <div className="completed">
            <FontAwesomeIcon icon={faCheck} />
          </div>
        )}
        <div className="section">
          <h1 className="heading">{activeSection["heading"]}</h1>
          <p className="sub-heading">{activeSection["subHeading"]}</p>
        </div>

        <BoardingProcess secIndex={secIndex} activeSection={activeSection} sectionNames={sectionNames} formData={formValues} handleChange={this.handleChange} setEden={this.props.setEden} />
      </div>
    );
  }
}

export default OnBoarding;
