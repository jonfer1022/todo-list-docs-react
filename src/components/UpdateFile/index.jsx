const UpdateFile = ({ children, inputRef, onChoose }) => {

  const openFile = async (event) => {
    if (event.target.files[0].size > 2000000) {
      event.target.value = null;
    } else {
      onChoose(event.target.files[0]);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        className="d-none"
        type="file"
        onChange={openFile}
      />
      {children}
    </>
  );
};

export default UpdateFile;
