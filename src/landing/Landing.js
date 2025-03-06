import React, { useState } from "react";

import "./landing.css";
import logo from "../asserts/Logo.png";
import santaImg from "../asserts/Illustration.png";
import sockImg from "../asserts/sock.png";
import giftImage from "../asserts/Gift.png";
import snowman from "../asserts/snowman.png";
import { Loader } from "./utils/Loader";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { showToast, ToastNotification } from "./utils/toast";
import { assignFile, downloadFile, uploadEmployeeFile } from "../api/api";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Landing() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileAssign, setFileAssign] = useState(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFileChangeAssign = (event) => {
    setFileAssign(event.target.files[0]);
  };

  const handleAssign = async (event) => {
    event.preventDefault();

    if (!fileAssign) {
      alert("Please select a file to assign!");
      return;
    }

    setIsAssigning(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await assignFile(formData);
      console.log(result);

      if (result?.status) {
        const downloadResult = await downloadFile();
        if (downloadResult.success) {
          showToast("success", downloadResult.message);
        } else {
          showToast("error", downloadResult.message);
        }
      } else {
        showToast("error", result?.error || "File assignment failed");
      }
    } catch (error) {
      showToast("error", "Something went wrong. Please try again.");
      console.error("Error assigning file:", error);
    } finally {
      setIsAssigning(false);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);
    const result = await uploadEmployeeFile(file);

    if (result.success) {
      showToast(
        "success",
        result.data?.message || "File Uploaded Successfully!"
      );
    } else {
      showToast("error", result.error);
    }

    setIsLoading(false);
  };

  return (
    <div className="main-div-landing">
        {/* <StarField/> */}
      <ToastNotification />
      <div className="sock-main-div">
        <img className="sock-image" src={sockImg} alt="sock" />
      </div>
      <div className="transperent-div">
        <div className="sub-div-content">
          <div className="header-div">
            <div className="logo-div">
              <img src={logo} className="image-logo" alt="logo_image" />
            </div>
          </div>
          <div className="content-div">
            <div className="content-text-div">
              <div className="text-content-div">
                <h2> Secret Santa Shuffle – Let the Fun Begin!</h2>
                <p>
                  Upload your team list, shuffle the names, and create
                  unforgettable moments! 🎁✨
                </p>
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab label="Upload Employee List" {...a11yProps(0)} />
                      <Tab label="Assign Employee " {...a11yProps(1)} />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={value} index={0}>
                    <div>
                      <form onSubmit={handleSubmit}>
                        <label>Select File :</label>
                        <input
                          onChange={handleFileChange}
                          className="input-file-select"
                          type="file"
                          accept=".csv, .xlsx"
                        />
                        <div className="loader-enable">
                          <button
                            disabled={isLoading}
                            style={{ opacity: isLoading ? 0.5 : 1 }}
                            className="upload-btn-file"
                          >
                            Upload File
                          </button>
                          <div className="loader-style-upload">
                            {isLoading ? <Loader /> : ""}
                          </div>
                        </div>
                      </form>
                    </div>{" "}
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    {/* <h2>Assign File </h2> */}
                    <div>
                      <label>Select Previous year File :</label>
                      <input
                        onChange={handleFileChangeAssign}
                        className="input-file-select"
                        type="file"
                        accept=".csv, .xlsx"
                      />
                      <div className="loader-enable">
                        <button
                          disabled={isAssigning}
                          style={{ opacity: isAssigning ? 0.5 : 1 }}
                          className="upload-btn-file"
                          onClick={handleAssign}
                        >
                          Assign File
                        </button>
                        <div className="loader-style-upload">
                          {isAssigning ? <Loader /> : ""}
                        </div>
                      </div>
                    </div>{" "}
                  </CustomTabPanel>
                </Box>
              </div>
            </div>
            <div className="santa-img-div">
              <img src={santaImg} className="santa-image" alt="santa" />
            </div>
            <div className="gift-main-div">
              <img className="sock-image" src={giftImage} alt="gift" />
            </div>
            <div className="snow-main-div">
              <img className="snow-image" src={snowman} alt="gift" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
