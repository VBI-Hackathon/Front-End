import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  :root {
    --main-color: #f15223;
  }

  ::-webkit-file-upload-button {
    display: none;
  }
 ::file-selector-button, {
    display: none;
  }
  input[type='file'] {
    opacity:0    
  }
  .MuiInput-root {
    display: none !important;
  }
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }



  body {
    /* font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; */
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    /* font-family: Georgia, Times, 'Times New Roman', serif; */
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }
`;
