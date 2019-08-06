import Layer from "./components/layer/layer";
import "./css/common.css";

const App = function() {
  var dom = document.getElementById("app");
  var layer = new Layer();
  console.log(layer);
  dom.innerHTML = layer.tpl({ name: "john" });
};

new App();
