import { useState } from "react";
import styled from "styled-components";
import DinamicForm from "./components/DinamicForm";
import { config } from "./mock_config";

function App() {
  const [isFormValid, setIsFormValid] = useState(false);
  const formId = 'dinamic';

  const handleFormSubmit = (values: Record<string, string>): void => {
    console.log('Form submitted:', values);
  };

  return (
    <AppBody>
      <DinamicForm
        formId={formId}
        config={config}
        onSubmit={handleFormSubmit}
        setIsValid={setIsFormValid}
      />
      <button form={formId} type="submit" disabled={!isFormValid}>
        Submit
      </button>
    </AppBody>
  );
}

export default App;

const AppBody = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;