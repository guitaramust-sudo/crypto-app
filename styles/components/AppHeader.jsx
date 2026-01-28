import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useContext, useEffect, useState } from "react";
import CryptoContext from "../context/crypto-context";
import CoinInfoModal from "./CoinInfoModal";
import AddAssetForm from "./AddAssetForm";

const { Header } = Layout;

const AppHeader = () => {
  const [select, setSelect] = useState(false);
  const { crypto } = useContext(CryptoContext);
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(null);
  const [drawer, setDrawer] = useState(false);

  const handleSelect = (value) => {
    setCoin(crypto.find((c) => c.id == value));
    setModal(true);
  };

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);

    return () => {
      document.removeEventListener("keypress", keypress);
    };
  }, []);

  return (
    <Header className="header">
      <Select
        style={{ width: "500px" }}
        open={select}
        onSelect={handleSelect}
        onClick={() => {
          setSelect((prev) => !prev);
        }}
        value="press / to open"
        placeholder="select one country"
        defaultValue={["china"]}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img width="20" src={option.data.icon} alt={option.data.label} />{" "}
            {option.data.label}
          </Space>
        )}
      />
      <Button type="primary" onClick={() => setDrawer((prev) => !prev)}>
        Add Asset
      </Button>

      <Modal
        title="Selected coin:"
        closable={{ "aria-label": "Custom Close Button" }}
        open={modal}
        footer={null}
        onCancel={() => setModal(false)}
      >
        <CoinInfoModal coin={coin}></CoinInfoModal>
      </Modal>

      <Drawer
        width="40%"
        title="Add Asset"
        closable={{ "aria-label": "Close Button" }}
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnHidden
      >
        <AddAssetForm onCLose={() => setDrawer(false)}></AddAssetForm>
      </Drawer>
    </Header>
  );
};

export default AppHeader;
