import './App.scss'
import Layout, {Header} from "antd/es/layout/layout";
import {Button, Col, Form, Input, InputNumber, Result, Row, Slider} from "antd";
import Title from "antd/es/typography/Title";
import {CreditRequest} from "./model/CreditRequest.ts";
import {useState} from "react";
import {useCredit} from "./request/useCredit.ts";
import {CreditRequestStatus, CreditResponse} from "./model/CreditResponse.ts";

function App() {
  const [ form ] = Form.useForm<CreditRequest>();
  const { fetchCreditResponse } = useCredit();

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
  const [ creditResponse, setCreditResponse ] = useState<CreditResponse | null>();
  const [ errorMessage, setErrorMessage ] = useState<string | null>();

  const onSubmit = () => {
    setErrorMessage(null);
    setCreditResponse(null);
    const request = {
      ...formData,
      personalCode: form.getFieldValue('personalCode')
    }

    fetchCreditResponse(request)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        return Promise.reject(response);
      })
      .then((data) => setCreditResponse(data))
      .catch((error) => {
        if (error.status === 404) {
          setErrorMessage('Personal code not found');
        }
      })
  };

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
                           len: 11,
                           message: 'Personal code is required and must contain 11 digits'
                         }]}>
                <Input placeholder="Personal Code" />
              </Form.Item>
              <Form.Item label="Loan Amount"
                         rules={[{
                           ...constraints.loanAmount, required: true,
                           message: "Loan amount must be between 2000 and 10000 euros"
                         }]}>
                <>
                  <InputNumber placeholder="Loan Amount"
                               style={{width: '100%'}}
                               addonBefore="€"
                               keyboard={true}
                               {...constraints.loanAmount}
                               {...formValues.loanAmount}
                  />
                  <Slider step={500} {...constraints.loanAmount} {...formValues.loanAmount} />
                </>
              </Form.Item>
              <Form.Item label="Loan Period"
                         rules={[{
                           ...constraints.loanPeriodInMonths, required: true,
                           message: "Loan period must be between 12 and 60 months"
                         } ]}>
                <>
                  <InputNumber placeholder="Loan Period"
                               style={{ width: '100%' }}
                               {...formValues.loanPeriodInMonths}
                               {...constraints.loanPeriodInMonths}
                               addonAfter="months"
                               keyboard={true}
                  />
                  <Slider step={6} {...constraints.loanPeriodInMonths} {...formValues.loanPeriodInMonths} />
                </>
              </Form.Item>
              <Button type="primary" onClick={onSubmit}>Submit</Button>
            </Form>
          </Col>
        </Row>
        {(errorMessage || !!creditResponse) &&
            <Row justify="center">
                <Col style={{
                  background: 'white',
                  margin: '0 24px 24px',
                  padding: 24,
                  borderRadius: '10px',
                  minWidth: "500px"
                }}>
                  {creditResponse?.status === CreditRequestStatus.APPROVE &&
                      <Result
                          status="success"
                          title="Your credit application approved"
                      />
                  }
                  {creditResponse?.status === CreditRequestStatus.DENY &&
                      <Result
                          status="error"
                          title="Your credit application denied"
                      />
                  }
                  {!!errorMessage &&
                      <Result
                          status="error"
                          title="Something went wrong"
                          subTitle={errorMessage}
                      />
                  }
                </Col>
            </Row>
        }
      </Layout>
    </div>
  )
}

export default App;
