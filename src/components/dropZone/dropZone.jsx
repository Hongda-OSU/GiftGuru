import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import IconButton from "@mui/material/IconButton";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "10px",
};

const thumbStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid #eaeaea",
  borderRadius: "8px",
  height: "100px",
  backgroundColor: "#fafafa",
  position: "relative",
};

const DropzoneAreaExample = ({handleImagesChange}) => {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback(
    (acceptedFiles) => {
      const newUniqueFiles = acceptedFiles.filter(
        (newFile) =>
          !files.some((existingFile) => existingFile.name === newFile.name)
      );
      const newFilesToAdd = newUniqueFiles
        .slice(0, 10 - files.length)
        .map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );

      setFiles((prevFiles) => [...prevFiles, ...newFilesToAdd]);
      handleImagesChange(newFilesToAdd); 
    },
    [files, handleImagesChange]
  );

  const removeFile = (event, fileName) => {
    event.stopPropagation();
    setFiles((prevFiles) =>
      prevFiles.filter((file) => {
        if (file.name === fileName) {
          URL.revokeObjectURL(file.preview);
          return false;
        }
        return true;
      })
    );
  };

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 10,
    multiple: true,
    noClick: files.length >= 10,
    noKeyboard: files.length >= 10,
  });

  const thumbs = files.map((file) => (
    <div key={file.name} style={thumbStyle}>
      <img
        src={file.preview}
        alt={file.name}
        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
      />
      <IconButton
        onClick={(event) => removeFile(event, file.name)}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 2,
          margin: "4px",
          color: "#8c8c8c",
        }}
      >
        <DeleteForeverIcon />
      </IconButton>
    </div>
  ));

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #eeeeee",
        padding: "20px",
        textAlign: "center",
        borderRadius: "24px",
        borderColor: "#007580",
        backgroundColor: "#f0f8ff",
      }}
    >
      <input {...getInputProps()} />
      {files.length === 0 && !isDragActive ? (
        <>
          <DriveFolderUploadIcon
            style={{ color: "#007580", fontSize: "36px" }}
          />
          <p style={{ color: "#007580", fontWeight: "bold" }}>
            Upload up to 10 images
          </p>
        </>
      ) : (
        <div style={gridStyle}>
          {thumbs}
          {files.length < 10 && (
            <div style={thumbStyle}>
              <AddCircleOutlineIcon
                style={{ fontSize: "36px", color: "#007580" }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropzoneAreaExample;
