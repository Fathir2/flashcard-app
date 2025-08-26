// src/App.jsx
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import AppRoutes from "./routes";
import { FlashCardProvider } from "./context/FlashContext";

function App() {
  return (
    <BrowserRouter>
      <FlashCardProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </FlashCardProvider>
    </BrowserRouter>
  );
}

export default App;