import Title from "./components/Title";

// import Setup from "./examples/1-first-request";

// import Setup from "./examples/2-headers";

// import Setup from "./examples/4-global-instance";

// import Setup from "./examples/5-custom-instance";
import Setup from "./examples/6-interceptors";


import "./axios/global";

function App() {
  return (
    <main>
      <Setup />
      <Title />
    </main>
  );
}

export default App;
