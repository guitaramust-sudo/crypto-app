import { Layout, Card, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
const { Sider } = Layout;
import { List, Typography, Tag } from "antd";
import { useContext } from "react"
import CryptoContext from "../context/crypto-context";

const AppSider = () => {
  const { assets } = useContext(CryptoContext);

  return (
    <Sider width="30%" className="sider">
      {assets.map((asset) => (
        <Card key={asset.id} className="sider__card">
          <Statistic
            title={asset.id.toUpperCase()}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
            prefix={
              asset.grow ? (
                <ArrowUpOutlined />
              ) : (
                <ArrowDownOutlined></ArrowDownOutlined>
              )
            }
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              {
                title: "Total Profit",
                value: asset.totalProfit,
                isPrice: true,
                withTag: true,
              },
              { title: "Total Amount", value: asset.amount },
              { title: "Difference", value: asset.growPercent, isPrice: true },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                {item.withTag && (
                  <Tag color={asset.grow ? "green" : "red"}>
                    {asset.growPercent.toFixed(2)}%
                  </Tag>
                )}
                {item.isPrice && (
                  <Typography.Text type={asset.grow ? "success" : "danger"}>
                    {item.isPrice
                      ? item.value.toFixed(2) + "$"
                      : item.value.toFixed(2)}
                  </Typography.Text>
                )}
                {!item.isPrice && (
                  <Typography.Text>
                    {item.isPrice
                      ? item.value.toFixed(2) + "$"
                      : item.value.toFixed(2)}
                  </Typography.Text>
                )}
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Sider>
  );
};

export default AppSider;
