import { useContext, useRef, useState } from "react";
import {
  Select,
  Space,
  Typography,
  Form,
  Input,
  Checkbox,
  Button,
  InputNumber,
  DatePicker,
  Result,
} from "antd";
import CryptoContext from "../context/crypto-context";
import CoinInfo from "./CoinInfo";

export default function AddAssetForm({ onCLose }) {
  const [form] = Form.useForm();
  const [coin, setCoin] = useState(null);
  const { crypto, addAsset } = useContext(CryptoContext);
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef();

  if (submitted) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="close" onClick={onCLose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="select coin"
        defaultValue={["Bitcoin"]}
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
    );
  }

  const handleAmountChange = (value) => {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  };

  const handlePriceChange = (value) => {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(value * amount).toFixed(2),
    });
  };

  const onFinish = (values) => {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    setSubmitted(true);
    addAsset(newAsset);
  };

  const onFinishFailed = () => {};

  const validateMessages = {
    required: "${label} is required",
    types: {
      number: "${label} is not valid number",
    },

    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  return (
    <>
      <CoinInfo coin={coin}></CoinInfo>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        style={{ maxWidth: 600, marginTop: "2rem" }}
        initialValues={{
          price: coin.price.toFixed(2),
        }}
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
      >
        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, type: "number", min: 0 }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Enter coin amount"
            onChange={handleAmountChange}
          />
        </Form.Item>

        <Form.Item label="Price" name="price">
          <InputNumber onChange={handlePriceChange} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Date & Time" name="time">
          <DatePicker showTime></DatePicker>
        </Form.Item>

        <Form.Item label="Total" name="total">
          <InputNumber disabled style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Add Asset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
