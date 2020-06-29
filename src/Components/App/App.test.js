import React from "react";
import App from "./App";
import renderer from "react-test-renderer";

test("Checking Funtion testing",()=>{
 let  componant= renderer.create(<App />).getInstance();
 let tree = componant.dataFunction();  
  expect(tree).toBe(10);
});