import './App.scss'
import Layout, {Header} from "antd/es/layout/layout";
import {Col, Row, Form, InputNumber, Input, Slider, Button} from "antd";
import Title from "antd/es/typography/Title";
import {CreditRequest} from "./model/CreditRequest.ts";
import {useState} from "react";

function App() {
  const [ form ] = Form.useForm<CreditRequest>();

  const constraints = {
    loanPeriodInMonths: {
      min: 12,
      max: 60,
      defaultValue: 36
    },
    loanAmount: {
      min: 2000,
      max: 10000,
      defaultValue: 5000
    }
  }

  const [ formData, setFormData ] = useState<CreditRequest>({
    personalCode: null,
    loanAmount: constraints.loanAmount.defaultValue,
    loanPeriodInMonths: constraints.loanPeriodInMonths.defaultValue
  });

  const formValues = {
    loanPeriodInMonths: {
      value: formData.loanPeriodInMonths,
      onChange: (value: number | null) => setFormData({
        ...formData,
        loanPeriodInMonths: typeof value === 'number' ? value : 0
      })
    },
    loanAmount: {
      value: formData.loanAmount,
      onChange: (value: number | null) => setFormData({
        ...formData,
        loanAmount: typeof value === 'number' ? value : 0
      })
    }
  }

  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <h2 style={{ color: 'white' }}>Credit Score</h2>
        </Header>
        <Row justify="center">
          <Col style={{
            background: 'white',
            margin: 24,
            padding: 24,
            borderRadius: '10px',
            minWidth: "500px"
          }}>
            <Title level={3}>Application</Title>
            <Form form={form} requiredMark={false} layout="vertical">
              <Form.Item label="Personal Code"
                         name="personalCode"
                         rules={[{
                           required: true,
                           message: 'Personal code is required'
                         }]}>
                <Input placeholder="Personal Code" />
              </Form.Item>
              <Form.Item label="Loan Amount"
                         name="loanAmount"
                         rules={[{
                           ...constraints.loanAmount, required: true,
                           message: "Loan amount must be between 2000 and 10000 euros"
                         }]}>
                <InputNumber placeholder="Loan Amount"
                             style={{width: '100%'}}
                             addonBefore="€"
                             keyboard={true}
                             {...constraints.loanAmount}
                             {...formValues.loanAmount}
                />
                <Slider step={500} {...constraints.loanAmount} {...formValues.loanAmount} />
              </Form.Item>
              <Form.Item label="Loan Period"
                         name="loanPeriodInMonths"
                         rules={[{
                           ...constraints.loanPeriodInMonths, required: true,
                           message: "Loan period must be between 12 and 60 months"
                         } ]}>
                <InputNumber placeholder="Loan Period"
                             style={{ width: '100%' }}
                             {...formValues.loanPeriodInMonths}
                             {...constraints.loanPeriodInMonths}
                             addonAfter="months"
                             keyboard={true}
                />
                <Slider step={6} {...constraints.loanPeriodInMonths} {...formValues.loanPeriodInMonths} />
              </Form.Item>
              <Form.Item>
                <Button type="primary">Submit</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Layout>
    </div>
  )
}

export default App;
