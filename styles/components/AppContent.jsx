import { Layout, Typography } from "antd";
import { useContext } from "react";
import CryptoContext from "../context/crypto-context";
import PortfolioChart from "./PortfolioChart";
import AssetsTable from "./AssetsTable";

const { Content } = Layout;

const AppContent = () => {
  const { assets, crypto } = useContext(CryptoContext);
  return (
    <Content
      className="content"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography.Title level={3} style={{ color: "white", marginTop: "1rem" }}>
        Portfolio:{" "}
        {assets
          .map((asset) => {
            const coin = crypto.find((c) => c.id === asset.id);
            return asset.amount * coin.price;
          })
          .reduce((acc, v) => (acc += v), 0)
          .toFixed(2)}
        $
      </Typography.Title>

      <PortfolioChart></PortfolioChart>
      <AssetsTable></AssetsTable>
    </Content>
  );
};

export default AppContent;
