import React from "react";
import { ConfigProvider } from "antd";
import NewsCard from "./components/NewsCard";
import { mockData } from "./data/mockNewsData";

const App: React.FC = () => {
  return (
    <ConfigProvider theme={{ token: { borderRadius: 8 } }}>
      <div style={{ maxWidth: 800, margin: "24px auto", padding: "0 16px" }}>
        <NewsCard data={mockData} />
      </div>
    </ConfigProvider>
  );
};

export default App;