import { useState } from "react";
import styled from "styled-components";
import DinamicForm from "./components/DinamicForm";
import { validateEmail, validatePassword, validateText } from "./helpers";
import { config } from "./mock_config";

function App() {
  const [isFormValid, setIsFormValid] = useState(false);
  const formId = 'dinamic';

  const handleFormSubmit = (values: Record<string, string>) => {
    console.log('Form submitted:', values);
  };

  return (
    <AppBody>
      <Container>
        <HeadImage>💁🏻‍♀️</HeadImage>
        <Header>
          Some header
        </Header>
        <Description>
          Some description
        </Description>
        <DinamicForm
          formId={formId}
          config={config}
          onSubmit={handleFormSubmit}
          setIsValid={setIsFormValid}
          validateEmail={validateEmail}
          validatePassword={validatePassword}
          validateText={validateText}
        />
        <Button form={formId} type="submit" disabled={!isFormValid}>
          Submit
        </Button>
      </Container>
    </AppBody>
  );
}

export default App;

const AppBody = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em 3em;
  border-radius: 0.3em;
  box-shadow:
    1.1px 1.2px 4.2px rgba(0, 0, 0, 0.031),
    3.1px 3.4px 11.6px rgba(0, 0, 0, 0.045),
    7.5px 8.1px 28px rgba(0, 0, 0, 0.059),
    25px 27px 93px rgba(0, 0, 0, 0.09);
`;

const HeadImage = styled.div`
  position: absolute;
  top: -0.7em;
  left: 43%;
  font-size: 5rem;
`;

const Header = styled.h2`
  margin-bottom: 0;
`;

const Description = styled.p`
  color: #545454;
  margin-bottom: 1.2em;
`;

const Button = styled.button`
  color: white;
  width: 10em;
  padding: 1em;
  border: none;
  border-radius: 0.3em;
  margin-top: 2em;

  :disabled {
    background-color: #f8bb8a;

    :active {
      background-color: #f8bb8a;
    }
  }

  :enabled {
    background-color: #ff7700;
    cursor: pointer;
  }

  :active {
    background-color: #bb5700;
  }
`;