import styled from 'styled-components';

export const ProductsDivS = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 16px;
  gap: 16px;

  #tableSection {
    border-radius: 8px;
    padding: 8px;
    h1 {
      font-size: 30px;
      margin-bottom: 15px;
      margin-top: 15px;
      // posiciona no centro da tela
      text-align: center;
    }
    table {
      width: 100%;
      padding: 8px;
      border-collapse: separate; 
      border-spacing: 0 10px; 
      margin-top: 10px;
  
      td, th {
        padding: 8px;
        align-items: center;
        text-align: center;
      }
      th {
        font-size: 15px;
      }
      td {
        border: solid 1px #000;
        padding: 0;
        height: 30px;
      }
      td:first-child {
        border-left-style: solid;
        border-top-left-radius: 10px; 
        border-bottom-left-radius: 10px;
      }
      td:last-child {
        border-right-style: solid;
        border-bottom-right-radius: 10px; 
        border-top-right-radius: 10px; 
      }
      #tableElCode {
        background-color: var(--tertiary);
      }
      #tableElName {
        background-color: var(--tertiary);
      }
      #tableElPrice {
        background-color: var(--tertiary);
      }
      #tableElCurPrice {
        background-color: var(--tertiary);
      }
      #tableElNewPrice {
        background-color: var(--tertiary);
      }
      #tableElStatus {
        background-color: var(--tertiary);
      }
    }
  }

  #csvSection {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 8px;
    background-color: var(--main);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  }

  #csvFile {
    display: flex;
    font-weight: bold;
    flex-direction: column;
    align-items: center;
  }

  #validationBtn {
    margin-top: 10px;
    width: 150px;
    height: 40px;
    border-radius: 8px;
    background-color: var(--extra);
    color: var(--buttonText);
    border: 2px solid var(--buttonBorder);
    text-align: center;
  }

  #validationBtn:disabled {
    background-color: var(--buttonBackgroundDisabled);
    color: var(--buttonText);
  }

  #updateBtn {
    margin-bottom: 10px;
    width: 150px;
    height: 40px;
    border-radius: 8px;
    background-color: var(--extra);
    color: var(--buttonText);
    border: 2px solid var(--buttonBorder);
    text-align: center;
  }

  #updateBtn:disabled {
    background-color: var(--buttonBackgroundDisabled);
    color: var(--buttonText);
  }
`;

export const ProductsCardS = styled.div`
  border: 1px solid var(--main);
  background-color: var(--main);
  height: 300px;
  width: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: left; 
  gap: 6px;
  padding: 15px;
  border-radius: 3px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
`;
